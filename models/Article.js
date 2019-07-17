const mongoose = require("mongoose");

// Save reference to schema constructor 
const Schema = mongoose.Schema;

// Using the schema constructor, this creates a new user Schema object
const ArticleSchema = new Schema({
    // `title` is required and a type of String
    title: {
        type: String,
        required: true
    },
    // `link` is required a type of String
    link: {
        type: String,
        required: true
    },
    // `Image is required and type oF String
    image: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    // `note` is an object that stores a Note id 
    // The ref property links the ObjectId to the Note model 
    // This allows us to populate the Article with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Using mongoose's model method this creates our model from the above schema 
let Article = mongoose.model("Article", ArticleSchema);

// Export Article model
module.exports = Article;