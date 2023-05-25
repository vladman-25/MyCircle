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
const friendsRoutes = require('./friends.routes')
const requiredAuth = require('../middlewares/auth')
const makeAdminRoutes = require('./makeadmin.routes')
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
router.use('/post', requiredAuth.userAuth, postRoutes)
router.use('/custompost', requiredAuth.userAuth, postcustomRoutes)
router.use('/comment', requiredAuth.userAuth, commentRoutes)
router.use('/like', requiredAuth.userAuth, likeRoutes)
router.use('/search', requiredAuth.userAuth, searchRoutes)
router.use('/page', requiredAuth.userAuth, pageRoutes)
router.use('/friends', requiredAuth.userAuth, friendsRoutes)

router.use('/makeadmin', makeAdminRoutes)
router.use('/adminmode', makeAdminRoutes)

module.exports = router