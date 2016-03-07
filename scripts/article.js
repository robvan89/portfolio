(function(module) {

  var articles = [];

  function Article (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());
    this.body = marked(this.body);

    return template(this);
  };

// I feel like this function could cause some problems if it gets called more than once. It's pushing to the Article.all array instead of setting its value.
  Article.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    rawData.forEach(function(ele) {
      Article.all.push(new Article(ele));
    })
  }

// This getAll function seems like it could be merged into the fetchAll function once an SQL table is impelmented.
  Article.getAll = function(rawData) {
    $.getJSON('data/portdata.json', function(rawData) {
      console.log('loading json anew');
      localStorage.rawData = JSON.stringify(rawData);
      Article.loadAll(rawData);
      articleView.initIndexPage();
    });
  }

  // This function will retrieve the data from either a local or remote source,
  // and process it, then hand off control to the View.
  // This should use a SQL table to be more efficient.
  Article.fetchAll = function() {
    if (localStorage.rawData) {
      $.ajax({
        type: 'HEAD',
        url: 'data/portdata.json',
        success: function(data,message,xhr) {
          console.log(xhr);
          var eTag = xhr.getResponseHeader('eTag');
          if(!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Article.getAll();
            console.log('changed etag load');
          } else {
            Article.loadAll(JSON.parse(localStorage.rawData));
            articleView.initIndexPage();
            console.log('Loaded from LS');
          }
        }
      });

    } else {
      Article.getAll();
    }
  }

  module.articlesController = articlesController;
})(window);
