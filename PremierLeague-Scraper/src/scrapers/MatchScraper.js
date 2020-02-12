/**
 * Created by chicken on 14/08/2014.
 */

var MatchScraper = function( urlToScrape, fileName ){

    var months = {
        "January"   : 1,
        "February"  : 2,
        "March"     : 3,
        "April"     : 4,
        "May"       : 5,
        "June"      : 6,
        "July"      : 7,
        "August"    : 8,
        "September" : 9,
        "October"   : 10,
        "November"  : 11,
        "December"  : 12
    };

    var match = function(date, time, teams, matchURL, location ){

        var teamsName = teams.split(' v ');
        var dateValues = date.split(' ');

        return {
            'date'          : new Date(dateValues[3],months[dateValues[2]],dateValues[1]),
            'time'          : time,
            'homeTeam'      : teamsName[0].trim(),
            'awayTeam'      : teamsName[1].trim(),
            'location'      : location.trim(),
            'matchURL'      : matchURL
        }
    };


    var scrapeURL = function($) {
        var matches = [];
        var matchesWidget = $('div[widget="fixturelistbroadcasters"]');
        matchesWidget.find('table').each(function ( index, table ) {
            var trs = $(table).find('tr');
            var date = $(trs[0]).find('th').text();

            trs.each(function (index, element) {
                if ($(this).find('td[class="fixturechange"]').length >0 ){
                    return;
                }

                if (index > 0 ) {
                    var tds = $(element).find('td');
                    var matchInfo = new match(
                        date,                                       // Date
                        tds.eq(0).text(),                           // Time
                        tds.eq(1).text(),                           // Teams
                        tds.eq(1).find('a').attr('href'),           // MatchURL
                        tds.eq(2).text()                            // Location
                    );

                    matches.push(matchInfo);
                }
            });
        });

        return matches;
    };

    return {
        'url'       : urlToScrape,
        'fileName'  : fileName,
        'scrapeURL' : scrapeURL
    };
};

//Export functions
module.exports = MatchScraper;