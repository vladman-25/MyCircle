const User = require('../models/user.model');
const validators = require("../helpers/validators")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config()
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const SECRET = process.env.SECRET


const registerUser = async (req, res) => {
    const { error } =  validators.register.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        let { email, phone, username, password } = req.body;
        password = bcrypt.hashSync(password, salt)

        let user = await User.findOne({username: username});
        if (user) {
            return res.status(400).send("There is already an user with that username!");
        }

        user = await User.findOne({email: req.body.email})
        if (user) {
            return res.status(400).send("There is already an user with that email!");
        }
        user = new User({email, phone, username, password})
        try {
            await user.save();
            return res.status(200).send("User created!")
        } catch (error) {
            console.log(error)
            return res.status(400).send("Error! Could not register!");
        }
    } catch(error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const loginUser = async (req, res) => {
    const { error } =  validators.login.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        const hash = user.password
        if(!bcrypt.compareSync(password, hash) === true) {
            return res.status(400).send("Wrong email or password!");
        }

        const payload = {id: user._id};
        const token = jwt.sign(payload, SECRET);
        user.password = "";

        return res.status(200).send({'token': token,'user': user})
    } catch (e) {
        console.log(e)
        return res.status(400).send("An unknown error occurred!")
    }
}

module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
}