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

// Config middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect to Mongo DB
mongoose.connect("mongodb://localhost/Article-Scraper", { useNewUrlParser: true });

// Configure handlebars
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main",
        extname: ".hbs",
        layoutsDir: "views/layouts/",
    })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// Routes
require("./routes/userRoutes")(app);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});