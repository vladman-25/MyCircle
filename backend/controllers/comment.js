const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

const createComment = async(req, res) => {
    try {
        let {post, me, comment} = req.body;
        if (comment === "") {
            return res.status(400).send("Comment cannot be empty!");
        }
        const dbPost = await Post.findById(post._id);
        if (!dbPost) {
            return res.status(400).send("Post doesn't exist!");
        }
        const dbUser = await User.findById(me._id);
        if (!dbUser) {
            return res.status(400).send("User doesn't exist!");
        }
        const comm = Comment({authorId : me, content: comment})
        await comm.save()
        dbPost.comments.push(comm._id);
        await dbPost.save()
        return res.status(200).send({msg:"Ok!"});
    } catch (error) {
        console.log(error)
        return res.status(500).send("Am murit");
    }
}

const getComments = async(req, res) => {

}

const getCommentById = async(req, res) => {

}

const editComment = async(req, res) => {

}

const deleteComment = async(req, res) => {

}

module.exports = {
    createComment: createComment,
    getComments: getComments,
    getCommentById: getCommentById,
    editComment: editComment,
    deleteComment: deleteComment,
}