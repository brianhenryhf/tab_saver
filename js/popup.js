//whoah - can keep open the popup and debug with dev tools by opening chrome-extension://ikajjkncpkhnfnkdgjplapkldjjkblok/main.html 
//  manually in a tab
(function () {
  'use strict';

  //TODO features
    //consider re-saving snapshot after tab launching?
    //if only one tab open and has no content, close it after launching all tabs?
    //some way to force height or temp fake content or some other rendering scheme - as-is sometimes renders with most content hidden and requires re-open of popup until it works.  like umatrix did.  or don't render until everything is loaded up somehow.
    //maybe make it easier to launch window - button by tab list that just creates the tabs and window.  for recovery.
    
  //TODO technical:
    //promises?
    //bring in module system
    
  //for now, window gives access to scripts loaded in main.html (popup)

  // TODO - still using jquery. probably time to update that and use modern techniques, vanillajs or a framework.
  var $ = window.jQuery,
      moment = window.moment;

  //TODO try handlebars or mustache?  ember?
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
      
        //$windowElem.append($('<ul>'));  more correct, but introduces some styling i don't want to mess with atm
        window.tabs.forEach(function(tab, idx) {
          var $tabElem = $('<li>'); //BRH TODO these don't wrap.  fixed width for popup will truncate viewable.  s/ prolly fix.
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


  var extractUris = function(text) {
    return text.split('\n').reduce(function(acc, curr) {
      if(/^(http:\/\/|https:\/\/|chrome-extension:\/\/)\S+/.test(curr)) {
        acc.push(curr);
      } else {
        console.info('unacceptable uri skipped: ' + curr);
      }
      return acc;
    }, []);
  };

  var lauchTabs = function(uriAry) {
    uriAry.forEach(function(uri){
      console.info('launching tab: ' + uri);
      chrome.tabs.create({url:uri});
    });
  };
  
  //exec fxn provided by Snapshotter namespace obj from background page
  var snapShotterExec = function(fn) {
    var returnVal;  //BRH NOTE not sure at moment if returnval is an option, as i'm not using, but just in case
    chrome.runtime.getBackgroundPage(function(window) { //note this is a DOM window object for the event page
      returnVal = fn(window.Snapshotter);
    });
    return returnVal;
  };

  window.onload = function() {
    //on extension button push, should show most recent session info saved for use in restoring  
    console.debug('popup onload'); //note this is off by default in chrome console

    //BRH NOTE could use some more general component construct and data- tags to determine what's submitted.  for now, this is fine.
    $('#tab-launcher > .js-submit').on('click', function(evt){
      console.debug('launcher submit clicked');
      var $tabLauncher = $('#tab-launcher'),
          $textInput = $tabLauncher.find('.js-text');

      var uris = extractUris($textInput.val().trim());
      if (uris) lauchTabs(uris);
    });

    $('#snap-now').on('click', function(evt){
      console.debug('snap now clicked');
      snapShotterExec(function(Snapshotter) {
        Snapshotter.saveSessionInfo();
        window.location.reload(); //BRH TODO this is crude - use a more complicated means of redrawing tab list.
      });
    });
    
    //could also show list of sessions and let user look at them and compare?
    snapShotterExec(function(Snapshotter) {
      var snappysnap = Snapshotter.getMostRecentSnapshot();
      $('#snap-display').append(formatSnapshot(snappysnap));
    });
  };
}());