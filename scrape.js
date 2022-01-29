console.log("Scraping page");
var result = {
    title: getTitlePublication(),
    date: getDatePublication(),
    language: getLanguagePublication(),
    keywords: getKeywordsPublication(),
    site: getSitePublication(),
    description: getDescriptionPublication()
}
console.log("Passing data back to popup")
result;