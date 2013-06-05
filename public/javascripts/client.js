$(function() {

  var times = $('[datetime]');

  var updateTimes = function() {
    times.each(function() {
      var $this = $(this);
      $this.html(moment(fixTime($this)).fromNow());
    });
  };

  var fixTime = function($el) {
    return $el.attr('datetime').replace(/EST$/, '+1000');
  };

  var update = function() {
    var since = fixTime(times.first());
    var url = location.href + '?' + $.param({'occurred_since_date': since});
    var insert = function(lis) {
      $(lis.pop()).hide().prependTo('.items').slideDown(function() {
        if (lis.length) insert(lis);
      });
    };
    $.get(url, function(data) {
      insert($(data).find('li').get());
      updateTimes();
    });
  };

  setInterval(update, 60 * 1000);
  updateTimes();

});
