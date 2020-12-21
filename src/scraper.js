import keyword_extractor from "keyword-extractor";
var meta = {
    lang: 'meta[name="lang"]',
    date: 'meta[name="date"]',
    articleDate: 'meta[property="article:published_time"]'
};
var toParse = {
    title: 'meta[name="title"]',
    description: 'meta[name="description"]',
    keywords: 'meta[name="keywords"]',
    twitterTitle: 'meta[name="twitter:title"]',
    twitterDesc: 'meta[name="twitter:description"]',
    ogTitle: 'meta[property="og:title"]',
    ogDesc: 'meta[property="og:description"]'
};
var dataParsed = {};
dataParsed.URL = document.URL;
dataParsed.words = "";
//dataParsed.words = document.querySelector('article').innerText;
for (let [key, value] of Object.entries(meta)) {
    try {
        dataParsed[key] = document.querySelector(value).content;
    } catch (err) {
        console.log(key + " was not found.")
    }
};
for (let [key, value] of Object.entries(toParse)) {
    try {
        dataParsed.words += " " + document.querySelector(value).content;
    } catch (err) {
        console.log(key + " was not found.")
    }
};
var keywords = keyword_extractor.extract(dataParsed.words, {
    language: "spanish",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
});
console.log("Keywords:");
console.log(keywords);
chrome.runtime.sendMessage(keywords);
