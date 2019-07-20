const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
const CommentSchema = new Schema({
    commentText: {
        type: String,
        required: true
    }
});

// This creates our model from the above Schema, using mongoose's model method
const Comment = mongoose.model("Comment", CommentSchema);

// Export Node model
module.exports = Comment;
