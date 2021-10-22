

main();



async function main() {

  
let tab = await getCurrentTab();

chrome.scripting.executeScript({
  target: {tabId: tab.id},
  files: ['lib/jquery.min.js', 'lib/date-scrape.js', 'scrape.js']}, 
  function(result){
    console.log("jquery loaded");
  }
);

//   chrome.runtime.connect({ name: "popup" });

//   chrome.scripting.executeScript(null, {file:'jquery-3.6.0.min.js'}, function(result){
//     chrome.scripting.executeScript({
//       target: {tabId: tab.id},
//       files: ['content-script.js']
//     });
// });

  

//   chrome.storage.sync.get("page", ({ page }) => {
    
//     document.getElementById('title').innerHTML = page.title;
//     document.getElementById('lang').innerHTML = page.lang + " " + page.html.lang;
//     document.getElementById('date').innerHTML = page.date;
//     //document.getElementById('keywords').appendChild(makeUL(page.keywords));
//   });
}



async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


function makeUL(array) {
  // Create the list element:
  var list = document.createElement('ul');
  for (var i = 0; i < array.length; i++) {
      var item = document.createElement('li');
      item.appendChild(document.createTextNode(array[i]));
      list.appendChild(item);
  }
  return list;
}
