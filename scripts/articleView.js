(function(module) {
var articleView = {};

  articleView.populateFilters = function() {
    template = Handlebars.compile($('#option-template').text());
    console.log("Populate Filters");
    webDB.execute('SELECT DISTINCT category FROM articles;', function(rows) {
      $('#category-filter').append(
        rows.map(function(row) {
          return template({val: row.category});
        })
      );
    });    
  };

  articleView.handleFilters = function() {
    console.log("handleFilters called");
    $('#filters').one('change', 'select', function() {
      resource = this.id.replace('-filter', '');
      page('/' + resource + '/' + $(this).val().replace(/\W+/g, '+'));
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

  articleView.index = function(articles) {
      $('#articles').show().siblings().hide();
      $('#articles article').remove();
      console.log("aV index called, articles removed");
      Article.all.forEach(function(a) {
        $('#articles').append(a.toHtml());
      });

      articleView.populateFilters(articles);
      articleView.handleFilters();
      articleView.setTeasers();
    };
  module.articleView = articleView;
})(window);
