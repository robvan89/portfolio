(function(module) {
var articleView = {};

  articleView.populateFilters = function(rows) {
    template = Handlebars.compile($('#option-template').text());
      if ($('#category-filter option').length < 2) {
        $('#category-filter').append(
          rows.map(function(row) {
            console.log(rows);
            return template({val: row.category});
          })
        );
      };
  };

  articleView.handleFilters = function() {
    console.log("handleFilters called");
    $('#filters').one('change', 'select', function() {
      resource = this.id.replace('-filter', '');
      page('/' + resource + '/' + $(this).val().replace(/\W+/g, '+'));
    });
  };

  articleView.index = function(articles) {
      $('#articles').show().siblings().hide();
      $('#articles article').remove();
      console.log("aV index called, articles removed");
      Article.all.forEach(function(a) {
        $('#articles').append(a.toHtml());
      });

      articleView.populateFilters();
      articleView.handleFilters();
      if ($('#articles article').length > 1) {
        $('.article-body *:nth-of-type(n+2)').hide();
      }
    };
  module.articleView = articleView;
})(window);
