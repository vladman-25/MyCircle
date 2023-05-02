const router = require("express").Router();

const {likeAction} = require('../controllers/like');

router.post('/', likeAction);

module.exports = router