const router = require("express").Router();
const {sendRequest, removeRequest, acceptRequest, removeFriend, getFriends } = require('../controllers/friends');

router.post('/sendrequest', sendRequest);
router.post('/removerequest', removeRequest);
router.post('/acceptrequest', acceptRequest);
router.post('/removefriend', removeFriend);
router.post('/getFriends', getFriends);

module.exports = router