(function(module) {

  function Article (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  };

  Article.all = [];

  Article.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS articles (' +
        'id INTEGER PRIMARY KEY, ' +
        'title VARCHAR(255) NOT NULL, ' +
        'author VARCHAR(255) NOT NULL, ' +
        'authorUrl VARCHAR (255), ' +
        'category VARCHAR(20), ' +
        'publishedOn DATETIME, ' +
        'body TEXT NOT NULL);',
      function(result) {
        console.log('Successfully set up the articles table.', result);
        if (callback) callback();
      }
    );
  };

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    rawData.forEach(function(ele) {
      Article.all.push(new Article(ele));
    })
  };

  Article.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM articles WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  Article.getAll = function(rawData) {
    $.getJSON('data/portdata.json', function(rawData) {
      console.log('loading json anew');
      localStorage.rawData = JSON.stringify(rawData);
      Article.loadAll(rawData);
      articleView.index();
    });
  };

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
            articleView.index();
            console.log('Loaded from LS');
          }
        }
      });
    } else {
      Article.getAll();
    }
    console.log("fetchAll complete");
  };

module.Article = Article;
})(window);
