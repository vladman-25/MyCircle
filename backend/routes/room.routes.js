const router = require("express").Router();

const { createRoom, getRooms, getRoomById, deleteRoom, updateRoom} = require('../controllers/room');

router.post('/', createRoom);
router.get('/', getRooms);
router.get('/:userID', getRoomById);
router.patch('/:userID', updateRoom);
router.delete('/:userID',deleteRoom);

module.exports = router