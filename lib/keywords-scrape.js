try {
    const objKeywordsTags = new Object({
    // H1 from the website
    option1: function () {
        var keywords_published = $("meta[name='keywords']").attr("content");
        return keywords_validation(keywords_published);
    },
    option2: function () {
        var keywords_published = $("meta[name='news_keywords']").attr('content');
        return keywords_validation(keywords_published);
    },
    option3: function () {
        var keywords_published = $("meta[name='keywords']").attr('content');
        return keywords_validation(keywords_published);
    }
});

// Helper functions.

function keywords_validation (keywords) {
    if ( keywords == undefined ) return false;
    if ( ! keywords.length ) return false;
    return keywords;
}

function getKeywordsPublication() {
    var keywords;
    for (var option in objKeywordsTags){
        keywords = objKeywordsTags[option]()
        if ( keywords ) return keywords
    }
    // A default value, in the event no date & time value is found.
    return keywords ? keywords : 'No keywords found';
}
} catch {
    console.log("Date stuff already declared")
}