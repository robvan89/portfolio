(function(module) {

  var articles = [];

  function Article (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Article.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS articles (' +
        'id INTEGER PRIMARY KEY, ' +
        'title VARCHAR(255) NOT NULL, ' +
        'category VARCHAR(20), ' +
        'publishedOn DATETIME, ' +
        'body TEXT NOT NULL);',
      function(result) {
        if (callback) {
          callback
        }
      }
    );
  };

  Article.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO articles (title, category, publishedOn, body) VALUES (?, ?, ?, ?);',
          'data': [this.title, this.category, this.publishedOn, this.body],
        }
      ],
      callback
    );
  };

  Article.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM articles WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  Article.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE articles SET title = ?, category = ?, publishedOn = ?, body = ? WHERE id = ?;',
          'data': [this.title, this.category, this.publishedOn, this.body, this.id]
        }
      ],
      callback
    );
  };

  Article.loadAll = function(rows) {
    Article.all = rows.map(function(ele) {
      return new Article(ele);
    });
  };

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());
    this.body = marked(this.body);
    return template(this);
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

  Article.purge = function() {
    webDB.execute(
      [
        {
          sql: drop table Articles
        }
      ]
    )
  }

  Article.fetchAll = function(callback) {
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn DESC', function(rows) {
      if (rows.length) {
        Article.loadAll(rows);
        callback();
      } else {
        $.getJSON('data/portdata.json', function(rawData) {
          rawData.forEach(function(item) {
            var article = new Article(item);
            article.insertRecord();
          });
          webDB.execute('SELECT * FROM articles', function(rows) {
            Article.loadAll(rows);
            callback();
          });
        });
      }
    });
  };

  module.Article = Article;
})(window);
