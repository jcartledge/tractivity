$(function() {

});

function checkForUpdates() {
  var since = $('[data-time]').first().data('time').replace(/ EST$/, ' +1000');
  var url = location.href + '?' + $.param({'since': since});
  $.get(url, function(data) {
    console.log(data);
  });
}