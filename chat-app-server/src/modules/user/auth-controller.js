const express = require("express");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { handleValidation } = require("../../common/middlewares");
const { validateRegistration } = require("./request");
const cloudinary = require("../../common/cloudinary");
const uploader = require("../../common/multer");
const {
  checkUser,
  searchOne,
  changePassword,
  tryCreateUser,
} = require("./service");

const router = express.Router();
const modelName = "User";

const createUserHandler = async (req, res, next) => {
  const file = req.file;
  try {
    let cloudinaryResponse = '';
    if (file) {
      // Upload the file to Cloudinary
      cloudinaryResponse = await cloudinary.uploader.upload(file.path);
      req.body.imageUrl = cloudinaryResponse.secure_url
    }
    const user = req.body;
    const id = await tryCreateUser(user);
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User already exists by email.",
      });
    }
    return res
      .status(201)
      .send({ status: "ok", message: "User created successfully", id });
  } catch (error) {
    return next(error);
  }
};

const loginHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await checkUser(req.body.email, req.body.password);
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          user: `${req.body.firstName} ${req.body.lastName}`,
          exp:
            Math.floor(Date.now() / 1000) +
            parseInt(process.env.JWT_EXPIRES_IN, 10),
        },
        process.env.JWT_SECRET
      );
      const { passwordHash, chatHistory, ...rest } = user;

      const payload = {
        accessToken: token,
        ...rest,
      };
      res.status(200)
        .send({ status: "ok", message: ``, data: payload });;
      return;
    }
  }

  res.status(400).send("Invalid username or password");
};

const forgotPasswordHandler = async (req, res) => {
  if (req.body.email) {
    const user = await searchOne({ email: req.body.email }, modelName);
    if (user) {
      const newPassword = "a123"; // we will replace this and set from random string when we have the email service
      await changePassword(user, newPassword);
      res.status(200).send("Password changed successfully");
      return;
    }
  }

  res.status(400).send("Invalid email");
};


router.post(
  "/register",
  uploader.single("file"),
  handleValidation(validateRegistration),
  createUserHandler
);
router.post("/login", loginHandler);
router.post("/forgotPassword", forgotPasswordHandler);


module.exports = router;
