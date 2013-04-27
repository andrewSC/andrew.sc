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

$.twitter = function(userName, numberOfTweets) {
  var url = 'http://api.twitter.com/1/statuses/user_timeline/' + userName + '.json?callback=?';

  $.getJSON(url, function(tweets) {
    for (var i = 0; i < numberOfTweets; i++) {
      var tokenizedTweet = tweets[i].text.split(/[' '|\n|\r]/),
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

  $.twitter('andrew_sc', 5);

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