(function(module) {
  var articlesController = {};
  Article.createTable();

  articlesController.index = function() {
    $('main > section').hide();
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
