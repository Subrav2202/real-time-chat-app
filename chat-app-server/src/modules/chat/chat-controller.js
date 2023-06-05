const express = require("express");
const mongoose = require("mongoose");
const { validateUser } = require("./request");
const {
    checkUserAndRequest,
    getChatHistoryById
} = require("./service");

const router = express.Router();

const chatToNewUserHandler = async (req, res, next) => {
    try {
        const user = req.body;
        const recipient = await checkUserAndRequest(user);
        if (recipient?._id) {
            res
                .status(201)
                .send({ status: "ok", message: `Sent request successfully ${recipient?.userName}` });
        }
        return res.status(400).send({
            status: "error",
            message: `User does not exists by email ${req.body.email}`,
        });
    } catch (error) {
        return next(error);
    }
};

const chatHistory = async (req, res, next) => {
    try {
        const { senderId } = req.query;
        const chatHistoryUsers = await getChatHistoryById(senderId);
        if (chatHistoryUsers.length) {
            res
                .status(200)
                .send({ status: "Ok", message: ``, data: chatHistoryUsers });
        }
        return res.status(400).send({
            status: "error",
            message: `User does not exists`,
        });

    } catch (error) {
        return next(error);
    }
}


router.post(
    "/newuser",
    validateUser,
    chatToNewUserHandler
);

router.get(
    "/history",
    chatHistory
);

module.exports = router;
