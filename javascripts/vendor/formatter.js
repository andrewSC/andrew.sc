$(window).resize(function() {
  var windowHeight = (($(window).height()-$('.center-me').height())/2),
      windowWidth = (($(window).width()-$('.center-me').width())/2),
      px = 'px';
  $('.center-me').css({
    top: windowHeight + px,
    left: windowWidth + px,
    position: 'relative'
  });
//  $('.quarter-me').css({
//    top: (windowHeight/2) + px,
//    left: windowWidth,
//    position: 'relative'
//  });
  $('.block').css({
    width: $(document).width(),
    height: $(window).height()
  })
  $('.lander-block').css({
    width: $(document).width(),
    height: $(window).height()-24
  })
}).resize();

/*
 * Source: https://github.com/madrobby/zepto/issues/401
 */
$.scroll = function(endY, duration) {
  endY = endY || ($.os.android ? 1 : 0);
  duration = duration || 410;

  var startY = document.body.scrollTop,
    startT  = +(new Date()),
    finishT = startT + duration;

  var interpolate = function (source, target, shift) {
    return (source + (target - source) * shift);
  };

  var easing = function (pos) {
    return (-Math.cos(pos * Math.PI) / 2) + .5;
  };

  var animate = function() {
    var now = +(new Date()),
      shift = (now > finishT) ? 1 : (now - startT) / duration;

    window.scrollTo(0, interpolate(startY, endY, easing(shift)));

    (now > finishT) || setTimeout(animate, 15);
  };

  animate();
};


Zepto(function($) {

  $(window).resize();
  $('#_about').on('click', function() {
    $.scroll($('#about').offset().top+1);
  });
  $('#_contact').on('click', function() {
    $.scroll($('#contact').offset().top+1);
  });
});