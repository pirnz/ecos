try {
    const objTitleTags = new Object({
    // H1 from the website
    option1: function () {
        var title_published = $("meta[property='og:title']").attr("content");
        return title_validation(title_published);
    },
    option2: function () {
        var title_published = $("meta[name='twitter:title']").attr('content');
        return title_validation(title_published);
    },
    option3: function () {
        var title_published = $(".entry-title").text();
        return title_validation(title_published);
    },
    option4: function () {
        var title_published = $("h1").text();
        return title_validation(title_published);
    },
    option5: function () {
        var title_published = document.title;
        return title_validation(title_published);
    }
});

// Helper functions.

function title_validation (title) {
    if ( title == undefined ) return false;
    if ( ! title.length ) return false;
    return title;
}

function getTitlePublication() {
    var title;
    for (var option in objTitleTags){
        title = objTitleTags[option]()
        if ( title ) return title
    }
    // A default value, in the event no date & time value is found.
    return title ? title : 'No title found';
}
} catch {
    console.log("Date stuff already declared")
}