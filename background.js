chrome.browserAction.setBadgeBackgroundColor({ color: '#64dd17' });

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  if (message.type == 'activateBadge'){
    chrome.tabs.get(sender.tab.id, function(tab) {
      if (chrome.runtime.lastError) {
        return;
      }
      chrome.storage.local.get([tab.url], function(result) {
        let text = result[tab.url];

        var badgeText = '';

        if (text !== undefined && text !== '') {
          badgeText = ' ';
        }

        if (tab.index >= 0) {
          chrome.browserAction.setBadgeText({tabId:tab.id, text: badgeText});
        } else {
          var tabId = sender.tab.id;
          chrome.webNavigation.onCommitted.addListener(function update(details) {
            if (details.tabId == tabId) {
              chrome.browserAction.setBadgeText({tabId: tabId, text: badgeText});
              chrome.webNavigation.onCommitted.removeListener(update);
            }
          });
        }
      });
    });
  }
});
