const currentTab = location.href;

chrome.storage.local.get([currentTab], function(result) {
  let text = result[currentTab];
  if((text !== undefined) && (text !== '')){
    chrome.runtime.sendMessage(null, {type: 'activateBadge'});
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'saveNote'){
    chrome.runtime.sendMessage(null, {type: 'activateBadge'});
  }
});
