const User = require('../models/user.model');
const validators = require("../helpers/validators")
const bcrypt = require("bcrypt");

require("dotenv").config()
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


const createUser = async(req, res) => {
    const { error } =  validators.createUser.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        let { firstname, lastname, username, email, password } = req.body;
        password = bcrypt.hashSync(password, salt)

        let user = await User.findOne({username: username});
        if (user) {
            return res.status(400).send("There is already an user with that username!");
        }

        user = await User.findOne({email: req.body.email})
        if (user) {
            return res.status(400).send("There is already an user with that email!");
        }
        user = new User({firstname, lastname, username, email, password})
        try {
            await user.save();
            return res.status(200).send("User created!")
        } catch (error) {
            console.log(error)
            return res.status(400).send("Error! Could not register!");
        }
    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const getUsers = async(req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).send(allUsers)
    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        if (!user) return res.status(400).send("This user id does not exist");
        return res.send.status(200).send(user)

    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const editUser = async(req, res) => {
    const { error } =  validators.patchUser.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const user = await User.findById(req.params.userID);
        if(!user) {
            return res.status(400).send("The given user does not exist!");
        }
        const patchableFields = ['firstName', 'lastName', 'username', 'email'];
        for(const fieldName of patchableFields) {
            if(fieldName in req.body) {
                user.set(fieldName, req.body[fieldName]);
            }
        }
        await user.save();
        return res.status(200).send("User edited!")
    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const deleteUser = async(req, res) => {
    try {
        const user = req.user;
        await req.user.remove();
        return res.status(200).send("User deleted!")
    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

module.exports = {
    createUser: createUser,
    getUsers: getUsers,
    getUserById: getUserById,
    editUser: editUser,
    deleteUser: deleteUser,
}