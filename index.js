var currentTab;

function saveText() {
  const key = currentTab;
  const value = document.getElementById('input').value;
  let setArgs = {};
  setArgs[key] = value;
  chrome.storage.local.set(setArgs, function() {});
}

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  currentTab = tabs[0].url;

  document.getElementById('save').onclick = function () {
    saveText();
  };

  chrome.storage.local.get([currentTab], function(result) {
    let text = result[currentTab];
    if(text === undefined){
      text = '';
    }
    document.getElementById('input').value = text;
  });
});
