(function(module) {
  var repoView = {};

  var ui = function() {
    var $about = $('#about');
    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  var render = function(repo) {
    var html = $('<li>').html('<p><a href= "' + repo.stargazers_url +'">' + repo.name + '</a></p>' +
    '<p>' + repo.description + '</p>');
    return html;
  };

  repoView.index = function() {
    ui();
    $('#about ul').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
