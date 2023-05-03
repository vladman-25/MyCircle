const router = require("express").Router();

const {searchAction} = require('../controllers/search');

router.post('/', searchAction);

module.exports = router