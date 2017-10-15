var request = require("request");
var cheerio = require("cheerio");


 
 // This function will scrape the NYTimes website (cb is our callback)
 var helpers = function(cb) {
   // Use the request package to take in the body of the page's html
   request("http://www.foxnews.com", function(err, res, body) {
     
     var $ = cheerio.load(body);
 
     // Make an empty array to save our article info
     var articles = [];
     $("h2.title").each(function(i, element) {
      
       var head = $(this).children(".a").text();
 
       // Grab the URL of the article
       var url = $(this).children(".a").attr("href");
 
       var sum = $(this).children(".summary").text().trim();
 
       // So long as our headline and sum and url aren't empty or undefined, do the following
       if (head && sum && url) {
         // This section uses regular expressions and the trim function to tidy our headlines and summaries
         // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
         var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
         var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
 
         // Initialize an object we will push to the articles array
 
         var dataToAdd = {
           headline: headNeat,
           summary: sumNeat,
           url: url
         };
 
         articles.push(dataToAdd);
         console.log(dataToAdd);
       }
     });
     // After our loop is complete, send back the array of articles to the callback function
     cb(articles);
   });
 };
 
 // Export the function, so other files in our backend can use it
 //module.exports = scrape;


module.exports = helpers;
console.log(helpers);
