/**
 * Created by BikashSingh.
 */
var StadiumScraper = function( urlToScrape, fileName ){

    var stadium = function(name, club, city, opened, closed, capacity, latitude, longitude  ){
        var decimalConverter = function(geolocation){
            var grades    = Number(geolocation.match(/[0-9]+°/)[0].slice(0, -1));
            var minutes   = Number(geolocation.match(/[0-9]+′/)[0].slice(0, -1));
            var seconds   = Number(geolocation.match(/[0-9]+″/)[0].slice(0, -1));
            var direction = geolocation.slice(-1)[0];

            var decimals = (minutes*60 + seconds)/3600 + grades;

            if (direction == 'S' || direction == 'W') {
                return -Math.abs(decimals);
            }else {
                return decimals;
            }
        }

        return {
            'name'      : name,
            'club'      : club,
            'city'      : city,
            'opened'    : opened,
            'closed'    : closed,
            'capacity'  : capacity.slice(0, -1),
            'latitude'  : decimalConverter(latitude),
            'longitude' : decimalConverter(longitude)
        }
    }


    var scrapeURL = function($) {
        var stadiums = [];
        var stadiumsTable = $('.wikitable.sortable');
        stadiumsTable.find('tr').each(function (index, element) {
            //Don't process the first row (It is the title row)
            if (index > 0) {
                var tds = $(this).find('td');
                stadiums.push(new stadium(
                    tds.eq(0).find('a').text(),
                    tds.eq(2).find('a').attr('title'),
                    tds.eq(3).text(),
                    tds.eq(4).text(),
                    tds.eq(5).text(),
                    tds.eq(6).text(),
                    tds.eq(7).find('.latitude').text(),
                    tds.eq(7).find('.longitude').text()
                ));
            }
        });

        return stadiums;
    };

    return {
        'url'       : urlToScrape,
        'fileName'  : fileName,
        'scrapeURL' : scrapeURL
    };
};

//Export functions
module.exports = StadiumScraper;


