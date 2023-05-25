const router = require("express").Router();

const { makeAdmin } = require('../controllers/makeadmin');

router.post('/admin',makeAdmin)

module.exports = router