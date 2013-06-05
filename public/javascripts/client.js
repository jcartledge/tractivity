$(function() {

  var getTimes = function($el) {
    if (!$el) $el = $('body');
    return $el.find('[datetime]');
  };

  var updateTimes = function(times) {
    if(!times) times = getTimes();
    times.each(function() {
      var $this = $(this);
      $this.html(moment(fixTime($this)).fromNow());
    });
  };

  var fixTime = function($el) {
    return $el.attr('datetime').replace(/EST$/, '+1000');
  };

  var update = function() {
    var since = fixTime(getTimes().first());
    var url = location.href + '?' + $.param({'occurred_since_date': since});
    var insert = function(lis) {
      $(lis.pop()).hide().prependTo('.items').slideDown(function() {
        if (lis.length) {
          insert(lis);
        }
      });
    };
    $.get(url, function(data) {
      var $data = $(data);
      updateTimes(getTimes($data));
      insert($data.find('li').get());
      updateTimes(getTimes());
    });
  };

  setInterval(update, 60 * 1000);
  updateTimes();

});
