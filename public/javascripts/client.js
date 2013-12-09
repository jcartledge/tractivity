$(function() {

    'use strict';

    function getTimes($el) {
        if (!$el) $el = $('body');
        return $el.find('[datetime]');
    }

    function updateTimes(times) {
        if(!times) times = getTimes();
        times.each(function() {
            var $this = $(this);
            $this.html(moment(fixTime($this)).fromNow());
        });
    }

    function fixTime($el) {
        console.log(getTimeZone());
        return $el.attr('datetime').replace(/EST$/, getTimeZone());
    }

    function getTimeZone() {
        var tz = (new Date()).getTimezoneOffset() / -.6;
        return tz < 0 ? tz : '+' + tz;
    }

    function update() {
        var since = fixTime(getTimes().first());
        var url = location.href + '?' + $.param({'occurred_since_date': since});
        function insert(lis) {
            $(lis.pop()).hide().prependTo('.items').slideDown(function() {
                if (lis.length) {
                    insert(lis);
                }
            });
        }
        $.get(url, function(data) {
            var $data = $(data);
            updateTimes(getTimes($data));
            insert($data.find('li').get());
            updateTimes(getTimes());
        });
    }

    setInterval(update, 60 * 1000);
    updateTimes();

});
