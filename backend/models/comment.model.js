const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema= new mongoose.Schema({
    authorId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment;
