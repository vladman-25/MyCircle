const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    }
    ,
    password: {
        type: String,
        required: true,
    }
    ,
    friendsList: {
        type: [ObjectId],
        ref: "User",
        required: false,
    }
    ,
    friendsRequest: {
        type: [ObjectId],
        ref: "User",
        required: false,
    }
    ,
    friendsSent: {
        type: [ObjectId],
        ref: "User",
        required: false,
    }
    ,
    role: {
        type: String,
        default: "Basic",
        required: true,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User',userSchema)
module.exports = User;