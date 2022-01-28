console.log("Scraping page");
console.log($("meta[property='og:title']").attr("content"));
var result = {
    title: getTitlePublication(),
    date: getDatePublication(),
}
console.log("Passing data back to popup")
result;