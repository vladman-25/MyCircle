const router = require("express").Router();
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const roomRouter = require('./room.routes');
const messageRouter = require('./message.routes');
const chatRoutes = require('./chat.routes.js');
const postRoutes = require('./post.routes.js');
const postcustomRoutes = require('./postcustom.routes');
const commentRoutes = require('./comment.routes');
const likeRoutes = require('./like.routes')
const searchRoutes = require('./search.routes')
const pageRoutes = require('./page.routes')
const requiredAuth = require('../middlewares/auth')

router.get('/', (req, res) => {
    const data = {
        success: true,
        message: "Connection working!",
        date: new Date().toLocaleString()
    }
    res.status(200).send(data);
})


router.use('/admin', userRouter)
router.use('/auth', authRouter)
router.use('/rooms', roomRouter)
router.use('/messages', messageRouter)
router.use('/chat', chatRoutes)
router.use('/post', requiredAuth.userPosting, postRoutes)
router.use('/custompost', requiredAuth.userPosting, postcustomRoutes)
router.use('/comment', requiredAuth.userPosting, commentRoutes)
router.use('/like', requiredAuth.userPosting, likeRoutes)
router.use('/search', requiredAuth.userPosting, searchRoutes)
router.use('/page', requiredAuth.userPosting, pageRoutes)

module.exports = router