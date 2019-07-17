// Require Axios and Cheerio to make scraping possible 
const axios = require("axios");
const cheerio = require("cheerio");

// Require models
const db = require("../models");

// Export routes
module.exports = (app) => {
    // A get route for scraping the Nomadic Matt website
    app.get("/scrape", (req, res) => {
        // Grab body of html with axios
        axios.get("https://www.nomadicmatt.com/travel-blog/").then((response) => {
            // Load html body from axios into cheerio 
            let $ = cheerio.load(response.data);

            // Grab every h2 within article tag 
            $("article").each((i, element) => {
                // Save empty result object
                let result = {};

                // Add text, href and image and save as properties of result object
                result.title = $(this)
                    .find(".entry-title-link")
                    .text();
                result.link = $(this)
                    .find(".entry-title-link")
                    .attr("href");
                result.image = $(this)
                    .find(".entry-image")
                    .attr("src");
                    console.log(result);
                // // Create a new article using the 'result' object built from scraping
                // db.Article.create(result)
                //     .then((dbArticle) => {
                //         // View the added result in the console
                //         console.log(dbArticle);
                //     })
                //     .catch((err) => {
                //         // log errors
                //         console.log(err);
                //     });
            });

            // Send message to the client
            res.send("Scrape Complete");
        
        });
    });

// // Route for getting all articles from the db
// app.get("/articles", (req, res) => {
//     // Grab every documemt in the article collection
//     db.Article.find({})
//         .then((dbArticle) => {
//             // If were able to successfully find articles, send back to client
//             res.json(dbArticle);
//         })
//         .catch((err) => {
//             res.json(err);
//         });
// });

// // Route for grabbing specific article by id, populate it with it's note
// app.get("/articles/:id", (req, res) => {
//     // Using the id passed in the id parameter
// })
}

































