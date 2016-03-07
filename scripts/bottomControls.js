(function(module) {
  var bottomControls = {};

  bottomControls.fillBottom = function() {
    console.log("fillBottom called");
    $('article').each(function(index,ele) {
      console.log("Each article function called");
      console.log(ele)
      if ($(this).attr('idx') < 3) {
        var title = $(this).attr('title');
        console.log(title);
        var idx = $(this).attr('idx');
        var controllerLink = '<li><a href="#' + idx + '">' + title + '</a></li>';
        $('#bottomcontroller').append(controllerLink);
      }
    })
  };

  module.bottomControls = bottomControls;
})(window);
