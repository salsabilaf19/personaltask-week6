const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    _commentId: {
        type: Number,
        required: false,
        unique: true
    },
    _postId: {
        type: Number,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("Comment", commentSchema);