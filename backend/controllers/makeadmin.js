const User = require('../models/user.model');

const makeAdmin = async(req, res) => {
    try {
        const {currUserID} = req.body;
        let currUser = await User.findById(currUserID);
        currUser.role = 'Admin'
        if(!currUser) {
            return res.status(400).send({msg:"User invalid"});
        }
        await currUser.save()
        return res.status(200).send({msg:"User is now admin"});
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Am murit"});
    }
}

module.exports = {
    makeAdmin: makeAdmin,
}