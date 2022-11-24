const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    _postId: {
        type: Number,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    content:{
        type: String,
        required: true,
    },
    dateofcreate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Post", postSchema);