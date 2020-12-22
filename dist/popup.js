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
  document.getElementById('title').innerHTML = request.title;
  document.getElementById('keywords').appendChild(makeUL(request.keywords));
});

function makeUL(array) {
  // Create the list element:
  var list = document.createElement('ul');

  for (var i = 0; i < array.length; i++) {
      // Create the list item:
      var item = document.createElement('li');

      // Set its contents:
      item.appendChild(document.createTextNode(array[i]));

      // Add it to the list:
      list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

