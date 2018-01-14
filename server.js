var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

var PORT = 3000;


var app = express();


mongoose.Promise = Promise;
mongoose.connect("", { //HERE IS AN ISSUE!!!!!  I have idea what should go here.
  useMongoClient: true
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

request("https://www.reddit.com/r/webdev", function(error, response, html) {
  
    var $ = cheerio.load(html);

    var results = [];
  
    $("p.title").each(function(i, element) {

      var title = $(element).text();

      var link = $(element).children().attr("href");
  
      results.push({
        title: title,
        link: link
      });
    });
  
    console.log(results);
  });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });