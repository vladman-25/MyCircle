const Room = require("../models/room.model");

const getChatHistory = async(req, res) => {
    try {
        let {url} = req.body;
        const room = await Room.findOne({url: url}).populate('messages')
        return res.status(200).send(room)
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

module.exports = {
    getChatHistory: getChatHistory
}