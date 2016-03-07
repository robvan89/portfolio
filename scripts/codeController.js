(function(module) {
  var codeController = {};

  codeController.index = function() {
    $('#code').show().siblings().hide();
    repos.requestRepos(repoView.index);
  };

  module.codeController = codeController;
})(window);
