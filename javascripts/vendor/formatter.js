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

//$.setBackground = function() {
//  var colors = ['#2C3E50', '#F39C12', '#222'],
//      randomColor = colors[Math.floor(Math.random() * colors.length)];
//  $('#lander').css('background-color', randomColor);
//};




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
//  $.setBackground();
  $('#_about').on('click', function() {
    $.scroll($('#about').offset().top+1);
  });
  $('#_contact').on('click', function() {
    $.scroll($('#contact').offset().top+1);
  });
});