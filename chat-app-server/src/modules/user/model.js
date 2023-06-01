const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { MongoError } = require("../../common/errors");


const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "000000000000",
    },
    createdAt: {
      type:Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// create index for username and email individually
userSchema.index({ userName: "text" });
userSchema.index({ email: "text" });

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

module.exports = { Model: User, name: ModelName };
