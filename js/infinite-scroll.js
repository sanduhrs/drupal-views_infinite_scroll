(function ($, views) {
  Drupal.behaviors.views_infinite_scroll = {
    attach: function (context) {

      $.each(views, function (unique_class, info) {
        $(unique_class, context).once(function () {

          var $view = $(this);
          var $loading_wrapper = $view.find('.loading-element-wrapper');
          var $loading_element = $('<div/>', {class : 'loading-element'}).text(info.options.loading_text);

          $.autopager({
            link: [info.view_class, '.infinite-scroll-wrapper .pager-next a'].join(' '),
            content: [info.view_class, '.view-content'].join(' '),
            autoLoad: !info.options.manual_load,
            start: autopager_start,
            load: autopager_load
          });

          var $load_more_button = $view.find('.load-more-button').click(function() {
            $.autopager('load');
          });

          function autopager_start() {
            $loading_wrapper.append($loading_element);
          }

          function autopager_load(prev, next) {
            $loading_wrapper.empty();
            if (next.url == undefined) {
              $load_more_button.remove();
            }
          }

        });
      });

    }
  };
})(jQuery, drupalSettings.views_infinite_scroll);
