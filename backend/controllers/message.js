const validators = require("../helpers/validators");
const Room = require("../models/room.model");
const User = require("../models/user.model");
const Message = require("../models/message.model");


const createMessage = async(req, res) => {
    // const { error } =  validators.createMessage.validate(req.body);
    // if (error)
    //     return res.status(400).send(error.details[0].message);
    try {
        let {author_id, room, author, content, time} = req.body;
        let user = await User.findById(author_id);
        if (!user) {
            return res.status(400).send("Author ID does not exist");
        }
        let room_name = await Room.findOne({url: room})
        if (!room_name) {
            return res.status(400).send("Room does not exist");
        }
        let msg = new Message({author_id, room, author, content, time})
        try {
            await msg.save();
            room_name.messages.push(msg);
            await room_name.save();

            return res.status(200).send("Message created!")
        } catch (error) {
            console.log(error)
            return res.status(400).send("Error! Could not create room!");
        }

    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const getMessageById = async(req, res) => {
    try {
        const message = await Message.findOne(req.params.messageID);
        if (!message) return res.status(400).send("This message id does not exist");
        return res.send.status(200).send(message)
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}
//
// const getMessages = async(req, res) => {
//     try {
//
//     } catch(error) {
//         console.log(error)
//         return res.status(500).send("Am murit")
//     }
// }
//
// const deleteMessage = async(req, res) => {
//     try {
//
//     } catch(error) {
//         console.log(error)
//         return res.status(500).send("Am murit")
//     }
// }

module.exports = {
    createMessage: createMessage,
    getMessageById: getMessageById,
    // getMessages: getMessages,
    // deleteMessage: deleteMessage,
}