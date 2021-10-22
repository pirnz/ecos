const $ = import('./')
console.log($( "h1"));

const currentPage = cheerio.load(document.getElementsByTagName("html")[0].innerHTML);
console.log(currentPage("time"))

var page = {};
var html = {};


page.URL = document.URL;
page.title = currentPage("date").text();
console.log(page)

chrome.storage.sync.set({ page });

function getLanguage(){
    const languages = {
        es: "spanish",
        en: "english",
        pl: "polish",
        fr: "french",
        it: "itlaian",
        ru: "russian",
        pt: "portuguese",
        de: "german",
        ro: "romanian",
        sv: "swedish",
        ar: "arabic",
        nl: "dutch",
        fa: "persian",
        xx: "no-lang-tag"
    }
    html.lang = document.documentElement.lang.toLowerCase() || "xx";
    Object.keys(languages).forEach( iso => {
        if(html.lang.includes(iso)) page.lang = languages[iso]
    });
    if(!page.lang) page.lang = "lang-not-supported";
}

function getDate(){
    //Get article's date
    var dateElements = {
        date: 'meta[name="date"]',
        articleDate: 'meta[property="article:published_time"]'
    };
    try {
        html.date = new Date(document.querySelector(dateElements.date).content);
    } catch (err) {
        console.log(dateElements.date + " was not found.");
        try{
            html.date = new Date(document.querySelector(dateElements.date).content);
        }catch{
            console.log(dateElements.articleDate + " was not found.");
        }
    }
    if(html.date) page.date = html.date.toDateString()
}

// //Find keywords
// var keywordElements = {
//     title: 'meta[name="title"]',
//     description: 'meta[name="description"]',
//     keywords: 'meta[name="keywords"]',
//     twitterTitle: 'meta[name="twitter:title"]',
//     twitterDesc: 'meta[name="twitter:description"]',
//     ogTitle: 'meta[property="og:title"]',
//     ogDesc: 'meta[property="og:description"]'
// };
// var options = {
//     language: page.lang == "unknown" ? "english" : page.lang,
//     remove_digits: true,
//     return_changed_case: true,
//     remove_duplicates: true
// };
// //console.log(options);
// page.raw = [];
// for (let [key, value] of Object.entries(keywordElements)) {
//     try {
//         page.raw = page.raw.concat(keyword_extractor.extract(document.querySelector(value).content, options));
//     } catch (err) {
//         console.log(key + " was not found.")
//     }
// };
// //Extract keywords of keywords
// //console.log(page.raw)
// page.keywords = keyword_extractor.extract(page.raw.join(' '), options);
// page.html = html;
// console.log(page);
// chrome.runtime.sendMessage(page);
// }