(function ($) {
  "use strict";
  /**
   * Insert a views infinite scroll view into the document after AJAX.
   *
   * @param {object} $new_view The new view coming from the server.
   */
  $.fn.infiniteScrollInsertView = function ($new_view) {
    var $existing_view = this;
    var $existing_content = $existing_view.find('.view-content').children();
    $new_view.find('.view-content').prepend($existing_content);
    $existing_view.replaceWith($new_view);
    $(document).trigger('infiniteScrollComplete', [$new_view, $existing_content]);
  };
})(jQuery);
