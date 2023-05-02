const router = require("express").Router();

const { getPostsByURL } = require('../controllers/postcustom');

router.post('/', getPostsByURL);

module.exports = router