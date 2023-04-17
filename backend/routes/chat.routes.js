const router = require("express").Router();

const { getChatHistory } = require('../controllers/chat');

router.post('/history', getChatHistory);
// router.post('/login', loginUser);

module.exports = router