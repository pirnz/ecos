try {
    const objSiteTags = new Object({
    // H1 from the website
    option1: function () {
        var site_published = $("meta[property='og:site_name']").attr("content");
        return site_validation(site_published);
    },
    // Use with caution, usually "author" refers to the journalist
    option2: function () {
        var site_published = $("meta[name='author']").attr('content');
        return site_validation(site_published);
    },
    option3: function () {
        var site_published = $("meta[name='source']").attr('content');
        return site_validation(site_published);
    },
    option4: function () {
        var site_published = window.location.host;
        return site_validation(site_published);
    }
});

// Helper functions.

function site_validation (site) {
    if ( site == undefined ) return false;
    if ( ! site.length ) return false;
    return site;
}

function getSitePublication() {
    var site;
    for (var option in objSiteTags){
        site = objSiteTags[option]()
        if ( site ) return site
    }
    // A default value, in the event no date & time value is found.
    return site ? site : 'No site found';
}
} catch {
    console.log("Date stuff already declared")
}