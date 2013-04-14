function ValidUrl(str) {
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
        if (ValidUrl(tokenizedTweet[j])) {
          tweet += (j > 0 ? ' ' : '') + '<a href="' + tokenizedTweet[j] + '" target="_blank">' + tokenizedTweet[j] + '</a>';
        } else {
          tweet += ' ' + tokenizedTweet[j];
        }
      }

      $('#twitter').append(tweet + '</div>');
    }
  });
}

Zepto(function($) {
  $.twitter('andrew_sc', 5);
  $('#contact h5').html('<a href="mailto:' + Base64.decode('YXNjOTAwM0ByaXQuZWR1') +'">' + Base64.decode('YXNjOTAwM0ByaXQuZWR1') + '</a>');
});