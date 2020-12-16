var toParse = {
    title: 'meta[name="title"]',
    description: 'meta[name="description"]',
    keywords: 'meta[name="keywords"]',
    lang: 'meta[name="lang"]',
    date: 'meta[name="date"]',
    articleDate: 'meta[property="article:published_time"]',
    twitterTitle: 'meta[name="twitter:title"]',
    twitterDesc: 'meta[name="twitter:description"]',
    ogTitle: 'meta[property="og:title"]',
    ogDesc: 'meta[property="og:description"]'
};
var dataParsed = {};
dataParsed.URL = document.URL;
for (let [key, value] of Object.entries(toParse)) {
    try{
        dataParsed[key] = document.querySelector(value).content;
    }catch(err){
        console.log(key + " was not found.")
    }
};
dataParsed;
