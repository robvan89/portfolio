(function(module) {
  var repoView = {};

  var ui = function() {
    var $code = $('#code');
    $code.find('ul').empty();
    $code.show().siblings().hide();
  };

  var render = function(repo) {
    var html = $('<li>').html('<p><a href= "' + repo.stargazers_url +'">' + repo.name + '</a></p>' +
    '<p>' + repo.description + '</p>');
    return html;
  };

  repoView.index = function() {
    ui();
    $('#code ul').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
