async function main() {
  
  let tab = await getCurrentTab();

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['lib/jquery.min.js', 'lib/date-scrape.js', 'lib/title-scrape.js', 'scrape.js']}, 
    function(result){
      //console.error(JSON.stringify(result))
      document.getElementById('title').innerHTML = result[0].result.title;
      document.getElementById('date').innerHTML = result[0].result.date;
    }
  );
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

main();