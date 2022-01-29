const objDescriptionTags = new Object({
    // H1 from the website
    option1: function () {
        var description_published = $("meta[name='description']").attr("content");
        return description_validation(description_published);
    },
    option2: function () {
        var description_published = $("meta[property='og:description']").attr('content');
        return description_validation(description_published);
    },
    option3: function () {
        var description_published = $("meta[property='twitter:description']").attr('content');
        return description_validation(description_published);
    }
});

// Helper functions.

function description_validation (description) {
    if ( description == undefined ) return false;
    if ( ! description.length ) return false;
    return description;
}

function getDescriptionPublication() {
    var description;
    for (var option in objDescriptionTags){
        description = objDescriptionTags[option]()
        if ( description ) return description
    }
    // A default value, in the event no date & time value is found.
    return description ? description : 'No description found';
}
