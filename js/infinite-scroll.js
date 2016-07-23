(function ($, Drupal) {
  "use strict";

  // Cached reference to $(window).
  var $window = $(window);

  // The threshold for how far to the bottom you should reach before reloading.
  var scroll_threshold = 200;

  // The selector for the automatic pager.
  var automatic_pager_selector = '.infinite-scroll-automatic-pager';

  // The selector for both manual load and automatic pager.
  var pager_selector = '.infinite-scroll-pager';

  // The selector for the automatic pager.
  var content_wrapper_selector = '.views-infinite-scroll-content-wrapper';

  // The event and namespace that is bound to window for automatic scrolling.
  var scroll_event = 'scroll.views_infinite_scroll';

  /**
   * Insert a views infinite scroll view into the document.
   */
  $.fn.infiniteScrollInsertView = function ($new_view) {
    var current_view_id = this.selector.replace('.js-view-dom-id-', 'views_dom_id:');
    // Get the existing ajaxViews object.
    var view = Drupal.views.instances[current_view_id];
    // Remove once so that the exposed form and pager are processed on
    // behavior attach.
    view.$view.removeOnce('ajax-pager');
    view.$exposed_form.removeOnce('exposed-form');
    // Make sure infinite scroll can be reinitialized.
    var $existing_pager = view.$view.find(pager_selector);
    $existing_pager.removeOnce('infinite-scroll');

    var $new_rows = $new_view.find(content_wrapper_selector).children();
    var $new_pager = $new_view.find('.js-pager__items');

    // Add the new rows to existing view.
    view.$view.find(content_wrapper_selector).append($new_rows);
    // Replace the pager link with the new link and ajaxPageState values.
    $existing_pager.replaceWith($new_pager);

    // Run views and VIS behaviors.
    Drupal.attachBehaviors(view.$view[0]);
  };

  /**
   * Handle the automatic paging based on the scroll amount.
   */
  Drupal.behaviors.views_infinite_scroll_automatic = {
    attach : function(context, settings) {
      $(context).find(automatic_pager_selector).once('infinite-scroll').each(function() {
        var $pager = $(this);
        $pager.addClass('visually-hidden');
        $window.on(scroll_event, function() {
          if (window.innerHeight + window.pageYOffset > $pager.offset().top - scroll_threshold) {
            $pager.find('[rel=next]').click();
            $window.off(scroll_event);
          }
        });
      });
    },
    detach: function (context, settings, trigger) {
      // In the case where the view is removed from the document, remove it's
      // events. This is important in the case a view being refreshed for a reason
      // other than a scroll. AJAX filters are a good example of the event needing
      // to be destroyed earlier than above.
      if (trigger === 'unload') {
        if ($(context).find(automatic_pager_selector).removeOnce('infinite-scroll').length) {
          $window.off(scroll_event);
        }
      }
    }
  };

})(jQuery, Drupal);
