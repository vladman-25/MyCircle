const Post = require("../models/post.model");


const getPostsByURL = async(req, res) => {
    // console.log("test")
    try {
        let {uploadedIn} = req.body;
        const posts = await Post.find({uploadedIn: uploadedIn})
            .populate('authorId')
            .populate({ path : 'comments',
                        populate : {
                            path : 'authorId'
                        }})
        return res.status(200).send(posts)
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

module.exports = {
    getPostsByURL: getPostsByURL,
}