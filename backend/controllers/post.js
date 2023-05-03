const formidable = require('formidable');
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const fs = require('fs');
const Console = require("console");
const SECRET = process.env.SECRET

const createPost = async(req, res) => {
    try {
        const form = formidable({ multiples: true, uploadDir: "./uploads/posts/" });
        await form.parse(req, async (err, fields, files) => {
            const caption = fields.caption

            const postedIn = fields.postedIn
            const authorizationHeader = req.headers.authorization;
            const token = authorizationHeader.split(" ")[1];
            const author = jwt.verify(token, SECRET).id
            const user = await User.findById(author);

            if (caption === "") {
                 fs.unlink("./uploads/posts/" + files.image.newFilename, await (err => {
                    if (err) console.log(err);
                }))
                return res.status(400).send({"error": "Error! Could not post!"});
            }

            const newPost = new Post({
                authorId: author,
                caption: caption,
                imgUrl: "",
                uploadedIn: postedIn,
                comments: [],
                likes: [],
            })

            let imgUrl


            if(files.image === undefined) {
                imgUrl = ""
                try {
                    await newPost.save();
                    return res.status(200).send({"msg":"Post without IMG created!"})
                } catch (error) {
                    console.log(error)
                    return res.status(400).send({"error":"Error! Could not post!"});
                }
            } else {
                imgUrl = newPost._id
            }

            const newPath = "./uploads/posts/" + imgUrl + ".png";
            await fs.rename( "./uploads/posts/" + files.image.newFilename, newPath, function (err) {
                if (err) throw err;
            });

            imgUrl = imgUrl + ".png";
            newPost.imgUrl = imgUrl
            try {
                await newPost.save();
                return res.status(200).send({"msg":"Post with IMG created!"})
            } catch (error) {
                console.log(error)
                return res.status(400).send({"error":"Error! Could not post!"});
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Am murit");
    }
}

const getPosts = async(req, res) => {

}

const getPostById = async(req, res) => {

}

const editPost = async(req, res) => {

}

const deletePost = async(req, res) => {

}

module.exports = {
    createPost: createPost,
    getPosts: getPosts,
    getPostById: getPostById,
    editPost: editPost,
    deletePost: deletePost,
}