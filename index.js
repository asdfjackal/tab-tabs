var currentTab;

function saveText() {
  const key = currentTab.url;
  const value = document.getElementById('input').value;
  let setArgs = {};
  setArgs[key] = value;
  chrome.storage.local.set(setArgs, function() {});
  chrome.tabs.sendMessage(currentTab.id, {type: 'saveNote'});
}

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  currentTab = tabs[0];

  document.getElementById('save').onclick = function () {
    saveText();
  };

  chrome.storage.local.get([currentTab.url], function(result) {
    let text = result[currentTab.url];
    if(text === undefined){
      text = '';
    }
    document.getElementById('input').value = text;
  });
});
