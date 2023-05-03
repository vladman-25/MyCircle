const router = require("express").Router();

const { createPage, getPages, getPageById, editPage, deletePage} = require('../controllers/page');

router.post('/', createPage);
router.get('/', getPages);
router.get('/:pageID', getPageById);
router.patch('/:pageID', editPage);
router.delete('/:pageID',deletePage);

module.exports = router