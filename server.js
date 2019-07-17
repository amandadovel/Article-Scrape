// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// Require Axios and Cheerio to make scraping possible 
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize express
var app = express();

// Connecting to PORT
var PORT = 3000;

// Routes
require("./routes/userRoutes")(app);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});