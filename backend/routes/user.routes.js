const router = require("express").Router();

const { createUser, getUsers, getUserById, editUser, deleteUser} = require('../controllers/user');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userID', getUserById);
router.patch('/:userID', editUser);
router.delete('/:userID',deleteUser);

module.exports = router