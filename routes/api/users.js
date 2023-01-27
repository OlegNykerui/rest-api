const express = require("express");
require("dotenv").config();
const router = express.Router();

const {
  registration,
  login,
  logout,
  current,
} = require("../../controllers/users");
const auth = require("../../models/middlewares/authMiddleware");
const ctrlWrapper = require("../../models/helpers/controllerWrapper");

router.post("/signup", ctrlWrapper(registration));
router.post("/login", ctrlWrapper(login));
router.get("/logout", auth, ctrlWrapper(logout));
router.get("/current", auth, ctrlWrapper(current));

module.exports = router;
