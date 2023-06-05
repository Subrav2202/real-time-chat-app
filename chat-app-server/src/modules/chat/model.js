const mongoose = require("mongoose");
const { MongoError } = require("../../common/errors");


const chatSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Reference to the "users" collection
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Reference to the "users" collection
        },
        content: String,
        timestamp: Date,
        // Other message fields
    }
);


chatSchema.post("save", (error, doc, next) => {
    if (error.name === "MongoError" && error.code === 11000) {
        // if error.message contains the substring 'duplicate key error' then it's a duplicate username
        if (error.message.includes("duplicate key error")) {
            const keyName = Object.keys(error.keyValue)[0];
            const errorMessage = `${keyMapping[keyName]} already exists`;
            next(new MongoError(errorMessage));
        } else next(new MongoError(error.message));
    } else {
        next();
    }
});

const ModelName = "Chat";
const Chat = mongoose.model(ModelName, chatSchema);

module.exports = { ChatModel: Chat, name: ModelName };
