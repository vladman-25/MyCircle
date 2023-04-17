const router = require("express").Router();
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const roomRouter = require('./room.routes');
const messageRouter = require('./message.routes');
const chatRoutes = require('./chat.routes.js')

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

module.exports = router