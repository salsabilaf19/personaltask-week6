const Posts = require("../schemas/post");

const showPost = async (req, res) => {
    const post = await Posts.find().sort({_postId: -1});
    res.json({
        posts: post
    });
};

const addPost = async (req, res) => {
    const { dateofcreate, title, user, password, content } = req.body;
    const data = await Posts.find().sort({dateofcreate: -1});
    const _postId = data.length ? data[0]._postId + 1 : 1;
    const createdPosts = await Posts.create({
        _postId:_postId, dateofcreate:dateofcreate, title:title, user:user, password:password, content:content
    });
    res.json({ posts: createdPosts });
};


const searchPost = async (req, res) => {
    const { search } = req.params;
    const onlyNum = /^[0-9]+$/;
    if (search.match(onlyNum)){
        const data = await Posts.find({ _postId: search });
        res.json({ data });
    } else {
        const result = await Posts.find({"$or": [
            {"title": {'$regex': search, "$options": "i"}}, 
            {"user": {'$regex': search, "$options": "i"}},
            {"content": {'$regex': search, "$options": "i"}}
        ]});
	    res.json({ result });
    }
};

const editPost = async (req, res) => {
    const { _postId } = req.params;
    const quantity = req.body;
  
    const existsPosts = await Posts.find({ _postId: Number(_postId) });
    if (existsPosts.length) {
        if ( existsPosts[0].password === req.body.password ) {
            await Posts.updateOne({ _postId: Number(_postId) }, { $set: { title: quantity.title, user: quantity.user, content: quantity.content } });
            res.json({ success: "Data has change"});
        } else {
            res.json({failed: "Password is Wrong"});
        }
    } else { 
        res.json({failed: "Data not found"});
    };
};

const deletePost = async (req, res) => {
    const { _postId } = req.params;

    const existsPosts = await Posts.find({ _postId: Number(_postId) });
    if (existsPosts.length) {
        if ( existsPosts[0].password === req.body.password ) {
            await Posts.deleteOne({ _postId: Number(_postId) });
            res.json({ success: "Data has been delete"});
        } else {
            res.json({failed: "Password is Wrong"});
        }
    } else { 
        res.json({failed: "Data not found"});
    };
};

module.exports = { showPost, addPost, searchPost, deletePost, editPost };