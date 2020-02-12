
var request = require('request'),
    cheerio = require('cheerio'),
    fs      = require('fs');

var Scrapers = function( configFileName ) {

    var start = function(){
        fs.readFile(__dirname + '/../' + configFileName, function( err, data ) {
            var config =  JSON.parse(data);
            if (err) {
                console.log("Error: Loading config file " + configFileName, err);
            } else {
                config.forEach( function( scraperModuleConfig ){
                    var scraperModule = require('./' + scraperModuleConfig.name + '.js');
                    var scraper = new scraperModule(scraperModuleConfig.url, scraperModuleConfig.saveToFile );
                    runScraper( scraper );
                });
            }
        });
    };

    var runScraper = function( scraper ){
        request(scraper.url, function(error, responseStatus, html){
            if (error) {
                console.log("Error: Loading " + scraper.url, error);
            } else {
                // Load the html with the jQuery functionality
                var dataScraped = scraper.scrapeURL(cheerio.load(html));
                saveToFile(dataScraped, scraper.fileName);
            }
        });
    };

    var saveToFile = function( data, fileName ){
        fs.writeFile('resources/' + fileName + '.json', JSON.stringify(data, null, 4), function(err){
            if (err) {
                console.log("Error: saving file " + fileName, err );
            } else {
                console.log(fileName + ' saved!');
            }
        });
    };

    return {
        'start' : start
    };
};

//Export functions
module.exports = Scrapers;