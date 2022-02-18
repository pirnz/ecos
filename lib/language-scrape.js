try {
    const objLanguageTags = new Object({
    // H1 from the website
    option1: function () {
        var language_published = $("meta[name='lang']").attr("content");
        return language_validation(language_published);
    },
    option2: function () {
        var language_published = document.documentElement.lang;
        return language_validation(language_published);
    },
    option3: function () {
        var language_published = $("meta[http-equiv='Content-Language']").attr("content");
        return language_validation(language_published);
    }
    
    // option3: function () {
    //     var language_published = $("meta[property='twitter:description']").attr('content');
    //     return language_published; //site_name_validation(site_name_published);
    // }
});

// Helper functions.

function language_validation (language) {
    if ( language == undefined ) return false;
    if ( ! language.length ) return false;
    return language;
}

function getLanguagePublication() {
    var language;
    for (var option in objLanguageTags){
        language = objLanguageTags[option]()
        if ( language ) return language
    }
    // A default value, in the event no date & time value is found.
    return language ? language : 'No language found';
}
} catch {
    console.log("Date stuff already declared")
}