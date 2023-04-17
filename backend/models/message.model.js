const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema({
    author_id: {
        type: ObjectId,
        required: true,
    },

    room: {
        type: String,
        required: true,
    },

    //
    author: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },
});

const Message = mongoose.model('Message',messageSchema)
module.exports = Message;