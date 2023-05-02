const router = require("express").Router();

const { createComment, getComments, getCommentById, editComment, deleteComment} = require('../controllers/comment');

router.post('/', createComment);
router.get('/', getComments);
router.get('/:postID', getCommentById);
router.patch('/:postID', editComment);
router.delete('/:postID',deleteComment);

module.exports = router