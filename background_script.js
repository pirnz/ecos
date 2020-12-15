chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'developer.chrome.com'},
            })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

/* const fetch = require('isomorphic-fetch');
//Input: URL

test = async function(){
    const response = await fetch('https://www.elperiodico.com/es/politica/20201114/samper-niega-injerencias-de-madi-la-decision-de-trapero-es-mia-8204350');
    const text = await response.text();
    const decodedText = decodeHtml(text);
    //console.log(text.substring(0,3000));
    console.log(decodedText.match(/<meta name="title" content="(.*?)"/)[1]); //El periodico: Titular
    console.log(decodedText.match(/<meta name="keywords" content="(.*?)"/)[1]);
    console.log(decodedText.match(/<meta name="date" content="(.*?)"/)[1]);
    console.log(decodedText.match(/<meta name="description" content="(.*?)"/)[1]);
},
decodeHtml = function(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
test(); */
//Output: Keywords
//Intput: Newspaper Feed URL

//Output: Keywords
//Input: Both keywords

//Output: List of URL's