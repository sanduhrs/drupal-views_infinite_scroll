(function ($) {
  "use strict";

  var $window = $(window);

  // The threshold for how far to the bottom you should reach before reloading.
  var scroll_threshold = 200;

  /**
   * Insert a views infinite scroll view into the document.
   */
  $.fn.infiniteScrollInsertView = function ($new_view) {
    var $existing_view = this;
    var $existing_content = $existing_view.find('.view-content').children();
    $new_view.find('.view-content').prepend($existing_content);
    $existing_view.replaceWith($new_view);
    $(document).trigger('infiniteScrollComplete', [$new_view, $existing_content]);
  };

  /**
   * Handle the automatic paging based on the scroll amount.
   */
  Drupal.behaviors.views_infinite_scroll_automatic = {
    attach : function(context, settings) {
      $('.infinite-scroll-automatic-pager', context).once().each(function() {
        var $pager = $(this);
        $pager.addClass('visually-hidden');
        $window.on('scroll.views_infinite_scroll', function() {
          if (window.innerHeight + window.pageYOffset > $pager.offset().top - scroll_threshold) {
            $pager.find('[rel=next]').click();
            $window.off('scroll.views_infinite_scroll');
          }
        });
      });
    }
  };

})(jQuery);
