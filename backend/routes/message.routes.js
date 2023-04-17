const router = require("express").Router();

const {createMessage, getMessageById} = require('../controllers/message');
router.post('/', createMessage);
// router.get('/', getMessages);
router.get('/:userID', getMessageById);
// router.delete('/:userID',deleteMessage);


module.exports = router