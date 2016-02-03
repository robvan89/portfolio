// // Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
 var articleView = {};
//
articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).attr('data-category');
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleCategoryFilter = function() {
  // TODO: Just like we do for #author-filter above, we should handle change events on the #category-filter element.
  //       When an option with a value is selected, hide all the articles, then reveal the matches.
  //       When the blank (default) option is selected, show all the articles, except for the template.
  //       Be sure to reset the #author-filter while you are at it!
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      var k = $(this).val();
      $('article').each(function() {
        $(this).hide();
      })
      $('article').each(function() {
        if (k === $(this).attr('data-category')) {
          $(this).show();
        }
      });

  } else {
      $('article').each(function() {
        if(!$(this).hasClass('template')) {
          $(this).show();
        }
      });
    }
  });
  };

articleView.handleMainNav = function() {
  // TODO: Add an event handler to .main-nav element that will power the Tabs feature.
  //       Clicking any .tab element should hide all the .tab-content sections, and then reveal the
  //       single .tab-content section that is associated with the clicked .tab element.
  //       So: You need to dynamically build a selector string with the correct ID, based on the
  //       data available to you on the .tab element that was clicked.
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.
    $('#articles').on('click', '.read-on', function() {
      event.preventDefault();
      $('.article-body *:nth-of-type(n+2)').fadeIn();
    // if($('.read-on').is(':visible') {
    //   $('.read-on').hide();
    // }


    });
  // TODO: Add an event handler to reveal all the hidden elements,
  //       when the .read-on link is clicked. You can go ahead and hide the
  //       "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  //       Ideally, we'd attach this as just 1 event handler on the #articles section, and let it
  //       process any .read-on clicks that happen within child nodes.

};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
articleView.populateFilters();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();
$();