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
const validationMiddlewares = require("../../models/middlewares/validationMiddlewares");

router.post("/signup", validationMiddlewares, ctrlWrapper(registration));
router.post("/login", validationMiddlewares, ctrlWrapper(login));
router.get("/logout", auth, ctrlWrapper(logout));
router.get("/current", auth, ctrlWrapper(current));

module.exports = router;
