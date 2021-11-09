const express = require("express");
const router = express.Router();
const reminderController = require("../controller/reminder_controller");
const { ensureAuthenticated } = require("../middleware/checkAuth");

router.get("/", ensureAuthenticated, reminderController.list);

router.get("/new", reminderController.new);

router.get("/:id", reminderController.listOne);

router.get("/:id/edit", reminderController.edit);

router.post("/", reminderController.create);

router.post("/update/:id", reminderController.update);

router.post("/delete/:id", reminderController.delete);

module.exports = router;
