async function main() {
  
  let tab = await getCurrentTab();

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['lib/jquery.min.js', 'lib/date-scrape.js', 'lib/site-scrape.js', 'lib/description-scrape.js', 'lib/language-scrape.js', 'lib/keywords-scrape.js', 'lib/title-scrape.js', 'lib/data-prep-dist.js']}, 
    function(){
      chrome.storage.local.get({
        result: ''
      }, function(item) {
        console.error(item.result);
        document.getElementById('title').value = item.result.title;
        document.getElementById('date').value = item.result.date;
        document.getElementById('language').value = item.result.language;
        document.getElementById('site').value = item.result.site;
        document.getElementById('keywords').value = item.result.keywords;
        document.getElementById('description').value = item.result.description;
    });
  }
  );
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

main();