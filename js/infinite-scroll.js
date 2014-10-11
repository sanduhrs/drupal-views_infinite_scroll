(function($, views) {
  Drupal.behaviors.views_infinite_scroll = {
    attach : function(context) {

      $.each(views, function(dom_id, settings) {
        $('.view-dom-id-' + dom_id, context).once(function() {
          var $view = $(this);
        });
      });

    }
  };
})(jQuery, drupalSettings.views_infinite_scroll);
