(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
      $.get('https://api.github.com/users/robvan89/repos' + '?per_page=5&sort=updated')
        .done(function(data, message, xhr) {
          repos.all = data;
        }
      }).done(function() {
        callback();
      });
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
