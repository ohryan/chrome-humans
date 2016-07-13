// on load
var humansURL = location.origin + '/humans.txt';
$.ajax({
  type: "GET",
  async: true,
  url: humansURL
}).done( function( response, text, xhr ) {
  chrome.runtime.sendMessage({"message": "humans_yes", "humansURL": humansURL});
}).fail(function() {
    chrome.runtime.sendMessage({"message": "humans_no" });
});

chrome.runtime.onMessage.addListener(
  function(request,sender, sendResponse) {
    if ( request.message === 'clicked_browser_action' ) {
      console.log(humansURL);
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": humansURL });
    }
  }
);
