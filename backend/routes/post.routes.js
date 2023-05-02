const router = require("express").Router();

const { createPost, getPosts, getPostById, editPost, deletePost} = require('../controllers/post');

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:postID', getPostById);
router.patch('/:postID', editPost);
router.delete('/:postID',deletePost);

module.exports = router