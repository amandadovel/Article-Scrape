// Require Axios and Cheerio to make scraping possible 
const axios = require("axios");
const cheerio = require("cheerio");
const router = require("express").Router();

// Require models
const db = require("../models");

router.get("/", (req, res) => {
    // Meta tags sent to handlebars
    res.locals.metaTags = {
        title: "Article Scraper | Home"
    }
    db.Article.find({ saved: false }).then((articles) => {
        res.render("home", { articles: articles })
    });
});

router.get("/scrape", (req, res) => {
    // Grab body of html with axios
    axios.get("https://www.nomadicmatt.com/travel-blog/").then((response) => {
        // Load html body from axios into cheerio 
        // console.log(response.data);
        let $ = cheerio.load(response.data);
        // console.log($);
        // console.log($("article").length);
        let total = $("article").length;
        let count = $("article").length;

        $("article").each((i, element) => {
            var title = $(element).find(".entry-title-link").text();
            var link = $(element).find(".entry-title-link").attr("href");
            var image = $(element).find(".entry-image").attr("src");
            // console.log(title);

            // If this found element had both a title and a link
            if (title && link && image) {
                // First check to see if article has already been added, if not add the new article
                db.Article.find({ title }, (err, data) => {
                    if (err) {
                        res.status(404).send(err.toString())
                    }
                    if (data.length === 0) {
                        // Insert the data in the scrapedData db
                        db.Article.create({
                            title: title,
                            link: link,
                            image: image
                        },
                            (err, created) => {
                                if (err) {
                                    // Log the error if one is encountered during the query
                                    console.log(err);
                                } else {
                                    // // Otherwise, log the inserted data
                                    // console.log(inserted);
                                    count--
                                    if (count === 0) {
                                        res.json(total)
                                    }
                                }
                            });
                    }
                });
            }
        });
    });
});

// Route for saved articles
router.get("/saved", (req, res) => {
    // Meta tags sent to handlebars
    res.locals.metaTags = {
        title: "Saved Articles | Home"
    }
    db.Article.find({ saved: true }).then(articles => {
        res.render("saved", { articles: articles });
    }).catch(err => {
        console.log(err);
    });
});

// Updating saved articles 
router.put("/saved/:id", (req, res) => {
    let id = req.params.id;
    db.Article.update({ _id: id }, { $set: { saved: req.body.saved } }, result => {
        res.status(200).json({ message: "Changed saved status" });
    });
});

// Route for grabbing a specific Article by id, populate it with it's Comment
router.get("/comment/:id", (req, res) => {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db
    db.Article.findOne({ _id: req.params.id })
        // and populate all of the Comments associated with it
        .populate("comment")
        .then((dbArticle) => {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.status(200).json(dbArticle);
        })
        .catch(err => {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Comment
router.post("/api/comment/:id", (req, res) => {
    console.log("Req body", req.body);
    // Create a new Comment and pass the req.body to the entry
    db.Comment.create({ commentText: req.body.commentText })
        .then(dbComment => {
            console.log("DB NOTE: ", dbNote)
            return db.Article.findOneAndUpdate({_id: req.params.id},
                {comment: dbComment._id},
                { new: true });
        })
        .then(dbArticle => {
            console.log("DB article:", dbArticle) 
            res.status(200).json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
});

// Clear all articles from database
router.get("/api/clear", (req, res) => {
    db.Article.deleteMany({}).then(data => {
        console.log(data);
        res.send(true);
    }).catch(err => {
        console.log(err);
    });
});



module.exports = router;



































