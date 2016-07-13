chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse ){
    switch ( request.message ) {
      case "humans_yes":
        chrome.browserAction.setIcon({
          path: {
            "19": "images/icon19-green.png",
            "38": "images/icon38-green.png"
          },
          tabId: sender.tab.id
        });
        break;
      case "humans_no":
        chrome.browserAction.setIcon({
          path: {
            "19": "images/icon19-red.png",
            "38": "images/icon38-red.png"
          },
          tabId: sender.tab.id
        });
        break;
      case "open_new_tab":
        chrome.tabs.create({"url": request.url});
        break;
    }
  }
);

chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});
