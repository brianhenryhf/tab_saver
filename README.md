# tab_saver

This is a Chrome extension that will periodically capture the urls of open tabs in all windows and store a
rolling set of backups. It also presents a bulk-opening feature, meant primarily to take a list of urls from the 
backup functionality, and reopen those tabs.

## Why?
**The problem:** Chrome provides a "Continue where you left off" startup feature, to reopen your windows/tabs when you open
the app. Rarely, but not never, Chrome will open and NOT do that. Or, on rare occasion, it may open only one window. Also, 
sometimes, a single window can crash and "Reopen Closed Tab" will not restore it. Or you may accidentally nuke a window,
do something else, and find you can't undo your way back to that window of tabs. If you're like me, and leave gads of 
tabs open at all times, you then feel the stomach-clenching pain of losing all
that knowledge/todos/etc.  This extension gives you a fallback plan - pop it open and you'll see a fairly recent list
of all your windows and their tabs - open new windows, copy the urls from a window in the list and pop them in the 
bulk-opener, and that window is restored.  Then, repeat for other windows (yes, this could be easier, but again, this
has been a personal-use extension for years).

Another use can be to save off a window of tabs as you realize you are not currently needing the contents, but may come
back to some day.  Throw that list of tabs in a text file and save it somewhere you will (if you are like me) inevitably
forget about - but hey, you tried.

## Screenshots
In all its current glorious form:

<img width="1262" alt="Screenshot 2024-10-29 at 8 48 37 PM" src="https://github.com/user-attachments/assets/2e5d651f-5750-450f-b6df-3793c958f0bc">


## Installation
Installation thus far has been via `chrome://extensions` and enabling "Developer mode", then drag the extension folder
to the extension tab or click the "Load unpacked".

## Configuration
Basically, using the "Options" item in Chrome's kebab menu for the extension, you can set the number of backups and interval 
at which to backup.

## Caveat
The code is messy, the UI is devoid of styling, and the JS style is ancient (yes, JQuery is in there...). Also, tab groups and window naming postdate
active work on this. Time permitting, some of these may be addressed.
