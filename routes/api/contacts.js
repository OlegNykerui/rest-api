const express = require("express");
const router = express.Router();
const ContactController = require("../../models/contactController");

router.get("/", ContactController.getAll);
router.get("/:id", ContactController.getById);
router.post("/", ContactController.add);
router.delete("/:contactId", ContactController.removeById);
router.put("/:id", ContactController.updateById);
router.patch("/:contactId/favorite", ContactController.favorite);

module.exports = router;
