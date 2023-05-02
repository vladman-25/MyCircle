const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET
const User = require("../models/user.model");

module.exports = {
    userPosting: (req,res,next) => {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            console.log("Token not found.");
            if (res !== undefined) {
                return res.status(400).json({err: "Unauthorized access"});
            }
        }

        const token = authorizationHeader.split(" ")[1];
        jwt.verify(token, SECRET, (error, decoded) => {
            if (error) {
                console.log("Token not valid. JWT failed.");
                if (res !== undefined) {
                    return res.status(400).json({err: "Unauthorized access"});
                }
            }
            const userId = decoded.id;
            User.findById(userId, (error, user) => {
                if (error || !user) {
                    if (res !== undefined) {
                        return res.status(400).json({err: "This account doesn't exist."});
                    }
                }
                req.user = user;
                return next();
            });
        });
    }
}