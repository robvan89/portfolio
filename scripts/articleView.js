(function(module) {
var articleView = {};

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
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
  });
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  console.log("Teasers set");
  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.initIndexPage = function() {
  Article.all.forEach(function(a){
    $('#articles').append(a.toHtml())
  });
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.setTeasers();
};
module.articleView = articleView;
})(window);
