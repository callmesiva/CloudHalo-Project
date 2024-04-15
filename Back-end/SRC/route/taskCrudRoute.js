const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const task = require("../controller/taskCrudControl");

router.post("/post", verifyToken, task.addTask);
router.get("/get", verifyToken, task.getTask);
router.delete("/delete/:_id", verifyToken, task.deleteTask);
router.get("/mark/:_id", verifyToken, task.updateMarkAsRead);
router.post("/notes/update/:_id", verifyToken, task.updateNotes);
router.post("/notes/delete/:_id", verifyToken, task.deleteNotes);
module.exports = router;
