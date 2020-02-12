

var scraperModule = require('./scrapers/Scraper.js');

//Load the Scraper's configuration and start them.
var scraper = new scraperModule('Config.json');
scraper.start();

