import keyword_extractor from "keyword-extractor";

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Injecting content script(s)');
  chrome.tabs.executeScript(tab.id,{
      file: '/scraper.js'
  },getKeywords);
});

function receiveText(resultsArray){
  console.log(resultsArray[0]);
}
function getKeywords(resultsArray){
  var text = "";
  console.log(resultsArray[0].description);
  var keywords = keyword_extractor.extract(resultsArray[0].description,{
    language:"spanish",
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: false
  });
  console.log(keywords)
}