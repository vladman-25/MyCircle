const User = require("../models/user.model");


const sendRequest = async(req, res) => {
    try {
        const {currUserID, targetUserID} = req.body;
        //console.log(currUserID)
        //console.log(targetUserID)
        let currUser = await User.findById(currUserID);
        let targetUser = await User.findById(targetUserID);

        if (!currUser) {
            return res.status(400).send({msg:"Your user invalid"});
        }
        if (!targetUser) {
            return res.status(400).send({msg:"Other user invalid"});
        }
        //console.log(currUser)
        //console.log(targetUser)
        let currUser_friendsSent = currUser.friendsSent
        //console.log(currUser_friendsSent)
        if (currUser_friendsSent === undefined) {
            currUser_friendsSent = [];
        }

        let targetUser_friendsRequest = targetUser.friendsRequest
        //console.log(targetUser_friendsRequest)
        if (targetUser_friendsRequest === undefined) {
            targetUser_friendsRequest = [];
        }

        if (!currUser_friendsSent.includes(targetUserID)) {
            currUser_friendsSent.push(targetUserID);
            currUser.friendsSent = currUser_friendsSent;
            await currUser.save()

            targetUser_friendsRequest.push(currUserID)
            targetUser.friendsRequest = targetUser_friendsRequest
            await targetUser.save()

            return res.status(200).send({msg:"Friend Req Sent"});
        } else {
            return res.status(200).send({msg:"Friend Req already sent"});
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Am murit"});
    }
}

const removeRequest = async(req, res) => {
    try {
        const {currUserID, targetUserID} = req.body;
        //console.log(currUserID)
        //console.log(targetUserID)
        let currUser = await User.findById(currUserID);
        let targetUser = await User.findById(targetUserID);

        if (!currUser) {
            return res.status(400).send({msg:"Your user invalid"});
        }
        if (!targetUser) {
            return res.status(400).send({msg:"Other user invalid"});
        }
        //console.log(currUser)
        //console.log(targetUser)

        let currUser_friendsSent = currUser.friendsSent
        //console.log(currUser_friendsSent)
        if (currUser_friendsSent === undefined) {
            currUser_friendsSent = [];
        }
        let targetUser_friendsRequest = targetUser.friendsRequest
        //console.log(targetUser_friendsRequest)
        if (targetUser_friendsRequest === undefined) {
            targetUser_friendsRequest = [];
        }
        if (currUser_friendsSent.includes(targetUserID)) {
            const index = currUser_friendsSent.indexOf(targetUserID);
            currUser_friendsSent.splice(index, 1);
            currUser.friendsSent = currUser_friendsSent;
            await currUser.save()

            const index2 = targetUser_friendsRequest.indexOf(currUserID);
            targetUser_friendsRequest.splice(index2, 1)
            targetUser.friendsRequest = targetUser_friendsRequest
            await targetUser.save()

            return res.status(200).send({msg:"Friend Req Remove"});
        } else {
            return res.status(200).send({msg:"Friend req not sent"});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Am murit"});
    }
}

const acceptRequest = async(req, res) => {
    try {
        const {currUserID, targetUserID} = req.body;
        //console.log(currUserID)
        //console.log(targetUserID)
        let currUser = await User.findById(currUserID);
        let targetUser = await User.findById(targetUserID);

        if (!currUser) {
            return res.status(400).send({msg:"Your user invalid"});
        }
        if (!targetUser) {
            return res.status(400).send({msg:"Other user invalid"});
        }
        //console.log(currUser)
        //console.log(targetUser)

        let currUser_friendsRequest = currUser.friendsRequest
        //console.log(currUser_friendsRequest)
        if (currUser_friendsRequest === undefined) {
            currUser_friendsRequest = [];
        }
        let targetUser_friendsSent = targetUser.friendsSent
        //console.log(targetUser_friendsSent)
        if (targetUser_friendsSent === undefined) {
            targetUser_friendsSent = [];
        }
        if (currUser_friendsRequest.includes(targetUserID)) {
            const index = currUser_friendsRequest.indexOf(targetUserID);
            currUser_friendsRequest.splice(index, 1);
            currUser.friendsRequest = currUser_friendsRequest;
            currUser.friendsList.push(targetUserID)
            await currUser.save()

            const index2 = targetUser_friendsSent.indexOf(currUserID);
            targetUser_friendsSent.splice(index2, 1)
            targetUser.friendsSent = targetUser_friendsSent
            targetUser.friendsList.push(currUserID)
            await targetUser.save()

            return res.status(200).send({msg:"Friend Added"});
        } else {
            return res.status(200).send({msg:"Friend cant be added"});
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Am murit"});
    }
}

const removeFriend = async(req, res) => {
    try {
        const {currUserID, targetUserID} = req.body;
        //console.log(currUserID)
        //console.log(targetUserID)
        let currUser = await User.findById(currUserID);
        let targetUser = await User.findById(targetUserID);

        if (!currUser) {
            return res.status(400).send({msg:"Your user invalid"});
        }
        if (!targetUser) {
            return res.status(400).send({msg:"Other user invalid"});
        }
        //console.log(currUser)
        //console.log(targetUser)

        let currUser_friendsList = currUser.friendsList
        //console.log(currUser_friendsList)
        if (currUser_friendsList === undefined) {
            currUser_friendsList = [];
        }
        let targetUser_friendsList = targetUser.friendsList
        //console.log(targetUser_friendsList)
        if (targetUser_friendsList === undefined) {
            targetUser_friendsList = [];
        }

        if (currUser_friendsList.includes(targetUserID)) {
            const index = currUser_friendsList.indexOf(targetUserID);
            currUser_friendsList.splice(index, 1);
            currUser.friendsList = currUser_friendsList;
            await currUser.save()

            const index2 = targetUser_friendsList.indexOf(currUserID);
            targetUser_friendsList.splice(index2, 1)
            targetUser.friendsList = targetUser_friendsList
            await targetUser.save()
            return res.status(200).send({msg:"Friend Removed"});
        } else {
            return res.status(200).send({msg:"Friend cant be removed"});
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Am murit"});
    }
}

const getFriends = async (req, res) => {
    try {
        const {userID, field} = req.body
        const user = await User.findById(userID).populate(field)
        if (!user) return res.status(400).send("This user id does not exist");
        return res.status(200).send(user[field])
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Am murit"});
    }
}

module.exports = {
    sendRequest: sendRequest,
    removeRequest: removeRequest,
    acceptRequest: acceptRequest,
    removeFriend: removeFriend,
    getFriends: getFriends,
}