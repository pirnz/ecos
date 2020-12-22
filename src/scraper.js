import keyword_extractor from "keyword-extractor";

var dataParsed = {};
//Determine language
const languages = {
    es: "spanish",
    en: "english"
}
dataParsed.lang = languages[document.documentElement.lang.toLowerCase()] || "spanish";
console.log("Language detected: " + dataParsed.lang);

//Get basic data of the website
dataParsed.URL = document.URL;
dataParsed.title = document.title;

//Get article's date
var dateElements = {
    date: 'meta[name="date"]',
    articleDate: 'meta[property="article:published_time"]'
};
try {
    dataParsed.date = new Date(document.querySelector(dateElements.date).content);
} catch (err) {
    console.log(dateElements.date + " was not found.");
    try{
        dataParsed.date = new Date(document.querySelector(dateElements.date).content);
    }catch{
        console.log(dateElements.articleDate + " was not found.");
    }
}

//Find keywords
var keywordElements = {
    title: 'meta[name="title"]',
    description: 'meta[name="description"]',
    keywords: 'meta[name="keywords"]',
    twitterTitle: 'meta[name="twitter:title"]',
    twitterDesc: 'meta[name="twitter:description"]',
    ogTitle: 'meta[property="og:title"]',
    ogDesc: 'meta[property="og:description"]'
};
var options = {
    language: dataParsed.lang,
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
};
//console.log(options);
dataParsed.raw = [];
for (let [key, value] of Object.entries(keywordElements)) {
    try {
        dataParsed.raw = dataParsed.raw.concat(keyword_extractor.extract(document.querySelector(value).content, options));
    } catch (err) {
        console.log(key + " was not found.")
    }
};
//Extract keywords of keywords
//console.log(dataParsed.raw)
dataParsed.keywords = keyword_extractor.extract(dataParsed.raw.join(' '), options);
console.log(dataParsed);
chrome.runtime.sendMessage(dataParsed);
