const User = require("../models/user.model");
const Room = require("../models/room.model");
const Message = require("../models/message.model");

const createMessage = async(author_id, room, author, content, time) => {
    try {
        let user = await User.findById(author_id);
        if (!user) {
            // return res.status(400).send("Author ID does not exist");
        }
        let room_name = await Room.findOne({url: room})
        if (!room_name) {
            // return res.status(400).send("Room does not exist");
        }
        let msg = new Message({author_id, room, author, content, time})
        try {
            await msg.save();
            room_name.messages.push(msg);
            await room_name.save();

            // return res.status(200).send("Message created!")
        } catch (error) {
            console.log(error)
            // return res.status(400).send("Error! Could not create room!");
        }

    } catch(error) {
        console.log(error)
        // return res.status(500).send("Am murit")
    }
}

module.exports = {
    createMessage: createMessage,
}