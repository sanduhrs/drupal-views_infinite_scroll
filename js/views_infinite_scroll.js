Drupal.behaviors.views_infinite_scroll = function() {
  // Make sure that autopager pluginis loaded
  if($.autopager) {
    // Make sure that views ajax is disabled
    if(!Drupal.Views) {
      $(Drupal.settings.views_infinite_scroll.pager_selector).hide();
      var content_selector = Drupal.settings.views_infinite_scroll.content_selector;
      var items_selector = Drupal.settings.views_infinite_scroll.items_selector;
      var next_selector = Drupal.settings.views_infinite_scroll.next_selector;
      var img_path = Drupal.settings.views_infinite_scroll.img_path;
      var img = '<div id="views_infinite_scroll-ajax-loader"><img src="' + img_path + '" alt="loading..."><div>';
      $.autopager({
        appendTo: content_selector,
        content: items_selector,
        link: next_selector,
        page: 0,
        start: function() {
          $(content_selector).append(img);            
        },
        load: function() {
          $('div#views_infinite_scroll-ajax-loader').remove(); 
        }    
      });
    }
    else {
      alert(Drupal.t('Views infinite scroll pager is not compatible with Ajax Views. please disable "Use Ajax" option'));
    }
  }
  else {
    alert(Drupal.t('Autopager jquery plugin in not loaded'));
  }
};  
