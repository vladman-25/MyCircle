const router = require("express").Router();

const { getPostsByURL, getPostsByUser} = require('../controllers/postcustom');

router.post('/page', getPostsByURL);
router.post('/user', getPostsByUser);

module.exports = router