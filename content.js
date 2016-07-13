// on load
var humansURL = location.origin + '/humans.txt';
var humansFound = false;
$.ajax({
  type: "GET",
  async: true,
  url: humansURL
}).done( function( response, text, xhr ) {
  chrome.runtime.sendMessage({"message": "humans_yes", "humansURL": humansURL});
}).fail(function() {
  humansURL = '';
  chrome.runtime.sendMessage({"message": "humans_no" });
});

chrome.runtime.onMessage.addListener(
  function(request,sender, sendResponse) {
    if ( request.message === 'clicked_browser_action' ) {
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": humansURL });
    }
  }
);
