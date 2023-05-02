const Post = require("../models/post.model");
const User = require("../models/user.model");


const likeAction = async (req, res) => {
    try {
        let {post, me} = req.body;
        const dbPost = await Post.findById(post._id);
        if (!dbPost) {
            return res.status(400).send("Post doesn't exist!");
        }
        const dbUser = await User.findById(me._id);
        if (!dbUser) {
            return res.status(400).send("User doesn't exist!");
        }

        const idx = dbPost.likes.indexOf(me._id)
        if (idx !== -1) {
            dbPost.likes.splice(idx,1)
        } else {
            dbPost.likes.push(me._id)
        }
        await dbPost.save()
        return res.status(200).send({msg:"Ok!"});
    } catch (error) {
        console.log(error)
        return res.status(500).send("Am murit");
    }
}

module.exports = {
    likeAction: likeAction
}