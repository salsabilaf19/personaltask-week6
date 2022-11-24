const Posts = require("../schemas/post");
const Comments = require("../schemas/comment");

const showComment = async (req, res) => {
    const { _postId } = req.params;
    const comments = await Comments.find();

    const filteredData = comments.filter((comment) => Number(comment._postId) === Number(_postId));
    if(filteredData.length){
        res.json({
            Comments: filteredData
        });
    } else {
        res.json({Comments: filteredData});
    }
};

const addComment = async (req, res) => {
    const { content } = req.body;
    const id = req.params._postId;
    const _postId = Number(id);

    const commentsdata = await Comments.find().sort({commentId: -1})
    const post = await Posts.find({_postId: _postId});
    if (post.length){
        if(content.trim() === ""){
            res.json({Error: "Content Blank !"});
        } else {
            const commentId = commentsdata.length ? commentsdata[0].commentId + 1 : 1;
            const createdComments = await Comments.create({
                commentId:commentId, _postId:_postId, content:content
            });
            res.json({ comments: createdComments });
        }
    } else {
        res.json({Error: "Post ID Not Found"});
    }
};

const editComment = async (req, res) => {
    const { content } = req.body;
    const { commentId }= req.params;

    const data = await Comments.find({ commentId: Number(commentId) });
    if (data.length){
        if ( content.trim() !== "" ){
            await Comments.updateOne({ commentId: Number(commentId) }, { $set: { content: content } });
            res.json({ Message: "Success !" });
        } else {
            res.json({Error: "Fill all the input !"});
        }
    } else {
        res.json({ Error: 'Data Not Found' });
    }
};

const deleteComment = async (req, res) => {
    const { commentId }= req.params;

    const data = await Comments.find({ commentId: Number(commentId) });
    if (data.length){
        await Comments.deleteOne({ commentId: Number(commentId) });
        res.json({ Message: "Success" });
    } else {
        res.json({ Error: 'Data Not Found' });
    }
};

module.exports = { showComment, addComment, deleteComment, editComment };