const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { MongoError } = require("../../common/errors");


const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phnNo: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    imageUrl:{ type: String, required: false },
    passwordHash: { type: String, required: true },
    chatHistory: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [] // Set the default value to an empty array
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// create index for username and email individually
// userSchema.index({ userName: "text" });
// userSchema.index({ email: "text" });

userSchema.post("save", (error, doc, next) => {
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

const ModelName = "User";
const User = mongoose.model(ModelName, userSchema);

module.exports = { UserModel: User, name: ModelName };
