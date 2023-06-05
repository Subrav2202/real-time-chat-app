const bcrypt = require("bcrypt");
const { NotFound } = require("../../common/errors");

// const { ChatModel, name: ModelName } = require("./model");
const { UserModel, name: ModelName } = require('../user/model');

const checkUserAndRequest = async ({ email, sender }) => {
    const recipientUser = await UserModel.findOneAndUpdate(
        { email: email },
        { $push: { chatHistory: sender } },
        { new: true }
    )
    if (recipientUser?._id) {
        UserModel.findByIdAndUpdate(
            sender,
            { $push: { chatHistory: recipientUser?._id } },
            { new: true }
        )
        return { _id, userName, email }
    }

    return false;
};

const getChatHistoryById = async (senderId) => {
    const user = await UserModel.findById(senderId)
    .populate({
      path: 'chatHistory',
      select: 'email firstName lastName phnNo imageUrl createdAt'
    })
    if (user.chatHistory.length) {
        return user.chatHistory
    }
    throw new NotFound(`Data not found by the id: ${senderId}`);
};


module.exports = { checkUserAndRequest, getChatHistoryById }