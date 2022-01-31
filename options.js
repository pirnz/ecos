function saveOptions(){
    chrome.storage.local.set({
        newsapi : document.getElementById("newsapi").value,
        newsdata : document.getElementById("newsdata").value
      }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
      });
}

function restoreOptions() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.local.get({
        newsapi: '',
        newsdata: ''
    }, function(tokens) {
      Object.keys(tokens).forEach(key => {
        document.getElementById(key).value = tokens[key];
      });
    });
  }

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);