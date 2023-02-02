const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { User } = require("../models/userSchema");
require("dotenv").config();
const { SECRET } = process.env;

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email in use",
      data: "Conflict",
    });
  }
  const avatarURL = gravatar.url(email);
  try {
    const newUser = new User({ email, password, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription: newUser.subscription,
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate({ _id: user._id }, { $set: { token } });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    },
  });
};

const logout = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Incorrect login or password",
      data: "Unauthorized",
    });
  }
  await User.findByIdAndUpdate({ _id: req.user.id }, { $set: { token: null } });
  return res.status(204).json();
};
const current = async (req, res, next) => {
  const user = await User.findById({ _id: req.user.id });

  return res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { originalname } = req.file;
  const tempUpload = req.file.path;
  const filename = `${_id}_${originalname}`;
  const newPathFile = path.join(__dirname, "../", "public", "avatars");
  const resultUpload = path.join(newPathFile, filename);
  try {
    await fs.rename(tempUpload, resultUpload);
    const resizeFile = await Jimp.read(resultUpload);
    await resizeFile.resize(250, 250).writeAsync(resultUpload);
    const avatarURL = path.join("avatar", filename);
    await User.updateOne({ _id }, { avatar: avatarURL });
    res.json({
      avatarURL,
      // status: "success",
    });
  } catch (err) {
    await fs.unlink(tempUpload);
    return next(err);
  }
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateAvatar,
};
