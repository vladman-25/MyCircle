const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const roomSchema = new mongoose.Schema({
    messages: {
        type: [ObjectId],
        ref: "Message",
        required: false,
    },
    ////
    url: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
});

const Room = mongoose.model('Room',roomSchema)
module.exports = Room;