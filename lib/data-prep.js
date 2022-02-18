console.log("Scraping page");
var keywords = []
var keyword_extractor = require('keyword-extractor');

if(getKeywordsPublication() != 'No keywords found') {
    keywords = getKeywordsPublication();
} else if (getDescriptionPublication() != 'No description found') {
    keywords = getDescriptionPublication();
} else {
    keywords = getTitlePublication()
}
keywords = keyword_extractor.extract(keywords,{
    language:"english",
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: true
});

var result = {
    title: getTitlePublication(),
    date: getDatePublication(),
    language: getLanguagePublication(),
    keywords: keywords.join(', '),
    site: getSitePublication(),
    description: getDescriptionPublication()
}

chrome.storage.local.set({
    result : result
  }, () => console.log("Data scraped"));
