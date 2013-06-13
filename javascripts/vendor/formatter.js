function validUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

$.twitter = function(params) {
  var cb = new Codebird;

  //  Don't worry, I have my twitter app set to read only ;)
  cb.setConsumerKey('TfmFbEOXAAC2PGCLBwdlLg', 's7Di6FYUdn5c9NaXEMSWFJIcOtRrA06ixviv32Krkdc');
  cb.setToken('128092384-Yd45v6H1Jorz3u1HhUB9deKpLgd2W46KJWw9Itzb', 'LuDd4NUqbpLWe2cBJMXS5LHiaExPKWclPmAjBiuLkc');

  cb.__call('statuses_userTimeline', params, function(reply) {
    for (var i = 0; i < params['count']; i++) {
      var tokenizedTweet = reply[i].text.split(/[' '|\n|\r]/),
          tweet = '<div>';

      for (var j = 0; j < tokenizedTweet.length; j++) {
        if (validUrl(tokenizedTweet[j])) {
          tweet += (j > 0 ? ' ' : '') + '<a href="' + tokenizedTweet[j] + '" target="_blank">' + tokenizedTweet[j] + '</a>';
        } else {
          tweet += ' ' + tokenizedTweet[j];
        }
      }
      tweet += '</div>';
      $(tweet).hide().appendTo('#twitter').fadeIn(500);
    }
  });
}

Zepto(function($) {
  var email = Base64.decode('YXNjOTAwM0ByaXQuZWR1');

  $.twitter({
    screen_name: 'andrew_sc',
    count: 4
  });

  $('form').submit(function(e) {
    e.preventDefault();
    var data = {};
    data.from = $('#email').val();
    data.to = email;

    Squaresend.mailto(data, function(){});

    $('#contact div').remove();
    $('#contact').append("<p class='thanks text-center'><span class='bold'>Thanks!</span><br> You'll be contacted shortly.</p>");
  });

  $('#contact h5').html('<a href="mailto:' + email + '">' + email + '</a>');
});