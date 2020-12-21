chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
},
  function (array_of_Tabs) {
    var tab = array_of_Tabs[0];
    chrome.tabs.executeScript(tab.id, {
      file: '/scraper.js'
    });
  });

chrome.runtime.onMessage.addListener(function (request) {
  document.getElementById('keywords').innerHTML = request;
});
