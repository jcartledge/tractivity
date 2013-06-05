$(function() {

  var update = function() {
    var since = $('[data-time]').first().data('time').replace(/EST$/, '+1000');
    var url = location.href + '?' + $.param({'occurred_since_date': since});
    var insert = function(lis) {
      $(lis.pop()).hide().prependTo('.items').slideDown(function() {
        if (lis.length) insert(lis);
      });
    };
    $.get(url, function(data) {
      insert($(data).find('li').get());
    });
  };

  setInterval(update, 60 * 1000);
});
