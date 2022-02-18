async function main() {
  
  let tab = await getCurrentTab();

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['lib/jquery.min.js', 'lib/date-scrape.js', 'lib/site-scrape.js', 'lib/description-scrape.js', 'lib/language-scrape.js', 'lib/keywords-scrape.js', 'lib/title-scrape.js', 'scrape.js']}, 
    function(result){
      //console.error(JSON.stringify(result))
      document.getElementById('title').value = result[0].result.title;
      document.getElementById('date').value = result[0].result.date;
      document.getElementById('language').value = result[0].result.language;
      document.getElementById('site').value = result[0].result.site;
      document.getElementById('keywords').value = result[0].result.keywords;
      document.getElementById('description').value = result[0].result.description;
    }
  );
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

main();