$(window).resize(function() {


  var wh = (($(window).height()-$('.center-me').height())/2)+'px';
  var ww = (($(window).width()-$('.center-me').width())/2)+'px';
  $('.center-me').css({
    top: wh,
    left: ww,
    position: 'relative'
  });
  $('.block').css({
    width: $(window).width(),
    height: $(window).height()
  })
}).resize();


/*
 * Source: https://github.com/madrobby/zepto/issues/401
 */
$.scroll = function(endY, duration) {
  endY = endY || ($.os.android ? 1 : 0);
  duration = duration || 200;

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
  $('#_about').on('click', function() {
    $.scroll($('#about').offset().top);
  });
  $('#_contact').on('click', function() {
    $.scroll($('#contact').offset().top);
  });
});