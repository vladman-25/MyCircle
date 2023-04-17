const validators = require("../helpers/validators");
const Room = require("../models/room.model");


const createRoom = async(req, res) => {
    const { error } =  validators.createRoom.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        let { url, topic} = req.body;
        let room = await Room.findOne({url: url});
        if (room) {
            return res.status(400).send("There is already a room with that URL!");
        }
        room = await Room.findOne({topic: topic});
        if (room) {
            return res.status(400).send("There is already a room with that topic!");
        }
        room = new Room({url,topic})
        try {
            await room.save();
            return res.status(200).send("Room created!")
        } catch (error) {
            console.log(error)
            return res.status(400).send("Error! Could not create room!");
        }
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const getRoomById = async(req, res) => {
    try {
        const room = await Room.findOne(req.params.roomID);
        if (!room) return res.status(400).send("This room id does not exist");
        return res.send.status(200).send(room)

    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const getRooms = async(req, res) => {
    try {
        const allRooms = await Room.find();
        return res.status(200).send(allRooms)
    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const deleteRoom = async(req, res) => {
    try {
        const room = req.room;
        await room.remove();
        return res.status(200).send("Room deleted!")
    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const updateRoom = async(req, res) => {
    try {
        const room = await Room.findById(req.params.roomID);
        if(!room) {
            return res.status(400).send("The given room does not exist!");
        }
        const patchableFields = ['url', 'topic'];
        for(const fieldName of patchableFields) {
            if(fieldName in req.body) {
                room.set(fieldName, req.body[fieldName]);
            }
        }
        await room.save();
        return res.status(200).send("Room edited!")
    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

module.exports = {
    createRoom: createRoom,
    getRooms: getRooms,
    getRoomById: getRoomById,
    deleteRoom: deleteRoom,
    updateRoom: updateRoom,
}