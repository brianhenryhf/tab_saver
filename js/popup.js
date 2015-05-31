'use strict';

//redo in coffeescript?
//promises?

//bring in module system
var $ = $,
    moment = moment;

//try handlebars or mustache?  ember?
var formatSnapshot = function(snapshot) {
  var $root = $('<div>');
  $root.addClass('root');
  if(snapshot) {
    //2015-05-30T00:04:17.316Z (ISO) converted to local
    var snapMoment = moment(snapshot.date);
    $root.text('Snapshot Date: ' + snapMoment.format('ddd M/D/YY h:mm:ss A') + " (" + snapMoment.fromNow() + ")");
  
    snapshot.windows.forEach(function(window, idx) {
      var $windowElem = $('<div>');
      $windowElem.addClass('window');
      $root.append($windowElem);
      $windowElem.text('Window:');
    
      window.tabs.forEach(function(tab, idx) {
        var $tabElem = $('<div>');
        $tabElem.addClass('tab');
        $windowElem.append($tabElem);
        $tabElem.text(tab.url);    
      });
    });
  } else {
    $root.text('No Snapshots Available');
  }
  return $root;
};


window.onload = function() {
  //on extension button push, should show most recent session info saved for use in restoring  
  
  //could also show list of sessions and let user look at them and compare.
  chrome.runtime.getBackgroundPage(function(window) { //note this is a DOM window object for the event page
    var snappysnap = window.getMostRecentSnapshot();
    $('#display').append(formatSnapshot(snappysnap));
  });
};
