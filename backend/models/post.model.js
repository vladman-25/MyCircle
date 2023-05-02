const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    authorId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: false,
    },
    uploadedIn: {
        type: String,
        required: true,
    },
    comments: {
        type: [ObjectId],
        ref: "Comment",
        required: false,
    },
    likes: {
        type: [ObjectId],
        ref: "User",
        required: false,
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post',postSchema)
module.exports = Post;
