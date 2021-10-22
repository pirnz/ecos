const objDateTimeTags = new Object({
    // The Dublin Core Metadata Initiative (DCMI) ( http://dublincore.org/about-us/ ).
    option1: function () {
        var datetime_published = $("meta[name='DC.Date']").attr("content");
        return validation(datetime_published);
    },
    option2: function () {
        var datetime_published = $("dc\\:date").text();
        return validation(datetime_published);
    },
    /**
      * Sources include:
      * - IFL Science ( http://www.iflscience.com/ );
      * - Popular Mechanics ( http://www.popularmechanics.com/ );
      * - The Guardian ( http://www.theguardian.com/ );
      * - Laughing Squid ( http://laughingsquid.com/ );
      * - Fast Company ( http://www.fastcocreate.com/ ).
    */
    option3: function () {
        var datetime_published = $("meta[property='article:published_time']").attr("content");
        return validation(datetime_published);
    },
    /**
      * Sources include:
      * - New York Times ( http://www.nytimes.com/ ).
    */
    option4: function () {
        var datetime_published = $("meta[name='ptime']").attr("content");
        var datetime_published_formatted = function(datetime) {
            // Example: 20140911212613, which is equivalent to: 2014-09-11T21:26:13
            if ( (typeof datetime !== 'undefined') && (datetime.length === 14) ) {
                // Date.
                var yyyy = datetime.slice(0, 4);
                var mm = datetime.slice(4, 6);
                var dd = datetime.slice(6, 8);
                // Time.
                var hours = datetime.slice(8, 10);
                var minutes = datetime.slice(10, 12);
                var seconds = datetime.slice(12, 14);
                // Date & Time.
                return datetime = yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + minutes + ':' + seconds;
            } else {
                return false;
            }
        };
        var datetime_published = datetime_published_formatted(datetime_published);
        return validation(datetime_published);
    },
    /**
      * Sources include:
      * - Science Magazine ( http://news.sciencemag.org/ );
      * - Politico ( http://www.politico.com/ ).
    */
    option5: function () {
        var datetime_published = $("time").attr("datetime");
        return validation(datetime_published);
    },
    /**
      * Sources include:
      * - BBC News ( http://www.bbc.com/news ).
    */
    option6: function () {
        var datetime_published = $('.date').data("seconds") * 1000;
        return validation(datetime_published);
    },
    /**
      * Sources include:
      * - Business Insider ( http://www.businessinsider.com/ ).
    */
    option7: function () {
        var datetime_published = $("span[data-bi-format='date']").attr('rel') * 1000;
        return validation(datetime_published);
    },
    /**
      * Reference: https://www.parsely.com/docs/integration/metadata/ppage.html
      * Sources include:
      * - Ars Technica ( http://arstechnica.com/ );
      * - The Next Web ( http://thenextweb.com/ );
      * - Live Science ( http://www.livescience.com/ );
      * - The Atlantic ( http://www.theatlantic.com/ );
      * - The Slate ( http://www.slate.com/ ).
    */
    option8: function () {
        var json = $.parseJSON( ( $("meta[name='parsely-page']").attr("content") ) ? $("meta[name='parsely-page']").attr("content") : false );
        var datetime_published_formatted = function(datetime) {
            /**
              * Examples include:
              * - 2015-12-28T20:10:25Z
              * - 2015-12-22 at 08:05:00AM EST
            */
            if ( typeof datetime !== 'undefined' ) {
                if ( /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}?Z/.test(datetime) ) {
                    return datetime;
                } else if ( /\d{4}-\d{2}-\d{2} at \d{2}:\d{2}:\d{2}\w{3} \w{3}/.test(datetime) ) {
                    var arrdt = datetime.split(' at ');
                    // Date.
                    var d = arrdt[0];
                    // Time.
                    var t = arrdt[1].slice(0, 8);
                    // Date & Time.
                    return d + 'T' + t;
                }
                return false;
            }
        };
        var datetime_published = datetime_published_formatted( (typeof json.pub_date !== 'undefined') ? json.pub_date : '' );
        return validation(datetime_published);
    },
    /**
      * Sources include:
      * - USA Today ( http://www.usatoday.com/ ).
    */
    option9: function() {
        var datetime_published = $("meta[itemprop='datePublished']").attr("content");
        return validation(datetime_published);
    },
    /**
      * Sources include:
      * - i09 ( http://io9.gizmodo.com/ ).
    */
    option10: function() {
        var json = $.parseJSON( ( $("script[type='application/ld+json']").html() ) ? $("script[type='application/ld+json']").html() : false );
        return validation( (typeof json.datePublished !== 'undefined') ? json.datePublished : '' );
    },
    /**
      * Sources include:
      * - i100 from the Independent ( http://i100.independent.co.uk/ ).
    */
    option11: function() {
        var datetime_published = $("article").data("releasedate");
        return validation(datetime_published);
    },
    /**
      * Sources include:
      * - Daily Kos ( http://www.dailykos.com/ ).
    */
    option12: function() {
        var datetime_published = $("span.timestamp").first().data("epoch-time");
        var datetime_published_formatted = function(datetime) {
            if ( typeof datetime !== 'undefined' ) {
                return datetime.toString().slice(0, 10) * 1000;
            } else {
                return false;
            }
        };
        return validation(datetime_published_formatted(datetime_published));
    },
    /**
      * Sources include:
      * - Vanity Fair ( http://www.vanityfair.com/ ).
    */
    option13: function() {
        var datetime_published = $("meta[name='pubdate']").attr("content");
        return validation(datetime_published);
    }
});

// Helper functions.

Date.prototype.getUnixTime = function() { return this.getTime() / 1000|0 };

function validation (datetime) {
return ( (new Date( datetime )) > 0 ) ? (new Date( datetime ).getUnixTime()) : '';
}

// Reference: https://gist.github.com/kmaida/6045266
function get_timestamp_from_unix_epoch (datetime) {
// Example: 1449854274, which is equivalent to: 2015-12-11 17:17:54
if ( (typeof datetime !== 'undefined') && (datetime.length === 10) ) {
    var dt = new Date(datetime * 1000), // Convert the passed timestamp to milliseconds
                // Date.
                yyyy = dt.getFullYear(),
                mm = ('0' + (dt.getMonth() + 1)).slice(-2), // Months are zero based, so add a leading 0.
                dd = ('0' + dt.getDate()).slice(-2), // Add leading 0.
                // Time.
                hours = dt.getHours(),
                minutes = ('0' + dt.getMinutes()).slice(-2), // Add leading 0.
                seconds = ('0' + dt.getSeconds()).slice(-2), // Add leading 0.
                time;
    // Date & Time.
    return time = yyyy + '-' + mm + '-' + dd + ' ' + hours + ':' + minutes + ':' + seconds;
} else {
    return false;
}
}

function getDatePublication () {
    var datetime;
    Object.keys(objDateTimeTags).every((option) => {
        datetime = get_timestamp_from_unix_epoch( objDateTimeTags[option]().toString());
        if (datetime !== false) {return false}
        else {return true}
    })
    // A default value, in the event no date & time value is found.
    return (datetime) ? datetime : '0000-00-00 00:00:00';
}
