const express = require("express");
const router = express.Router();
const controller = require("../../models/contactController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.add);
router.delete("/:contactId", controller.removeById);
router.put("/:id", controller.updateById);
router.patch("/:contactId/favorite", controller.favorite);

module.exports = router;
