const express = require("express");
const router = express.Router();

const { showPost, addPost, searchPost, editPost, deletePost } = require("./posts");
const { showComment, addComment, editComment, deleteComment } = require("./comments");

router.get('/posts', showPost);
router.post('/posts', addPost);
router.get('/posts/:search', searchPost);
router.put('/posts/:_postId', editPost);
router.delete('/posts/:_postId', deletePost);

router.get('/comments/:_postId', showComment);
router.post('/comments/:_postId', addComment);
router.put('/comments/:_commentId', editComment);
router.delete('/comments/:_commentId', deleteComment);

module.exports = router;
