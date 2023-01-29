const jwt = require("jsonwebtoken");

const { User } = require("../models/userSchema");
require("dotenv").config();
// const secret = process.env.SECRET;
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
  try {
    const newUser = new User({ email, password });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription: newUser.subscription,
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

module.exports = {
  registration,
  login,
  logout,
  current,
};
