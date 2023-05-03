const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Page = mongoose.model('Page',pageSchema)
module.exports = Page;