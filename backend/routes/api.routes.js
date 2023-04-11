const router = require("express").Router();
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');

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

module.exports = router