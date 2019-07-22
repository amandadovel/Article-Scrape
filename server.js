// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const routes = require("./routes/userRoutes");

// Initialize express
const app = express();


// Connecting to PORT
const PORT = 3000;

// Config middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect to Mongo DB
let MONGOD_URI = process.env.MONGODB_URI || "mongodb://localhost/article_scraper";

// Connect to Mongo DB
mongoose.connect(MONGOD_URI);

// Configure handlebars
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main",
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");

// Routes
app.use(routes);

// Start the server
app.listen(PORT,  () => {
    console.log("App running on port " + PORT + "!");
});