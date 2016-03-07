(function(module) {
  var articlesController = {};
  Article.createTable();

  articlesController.index = function(ctx) {
    $('main > section').hide();
    console.log("aC index called");
    $('#articles').show();
    articleView.index(ctx.articles);
  };

  articlesController.loadAll = function(ctx, next) {
    var articleData = function() {
      ctx.articles = Article.all;
      console.log("aC loadAll called");
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      console.log("ctx articles because article all length");
      next();
    } else {
      console.log("Else");
      Article.fetchAll(articleData);
    }
  };

  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };
    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  module.articlesController = articlesController;
})(window);
