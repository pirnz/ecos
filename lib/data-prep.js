console.log("Scraping page");
var result = {
    title: getTitlePublication(),
    date: getDatePublication(),
    language: getLanguagePublication(),
    keywords: getKeywordsPublication(),
    site: getSitePublication(),
    description: getDescriptionPublication()
}
result;