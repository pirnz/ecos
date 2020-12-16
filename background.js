chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Injecting content script(s)');
  chrome.tabs.executeScript(tab.id,{
      file: '/scraper.js'
  },receiveText);
});

function receiveText(resultsArray){
  console.log(resultsArray[0]);
}