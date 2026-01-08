const express = require("express")
const router = express.Router()
const asyncHandler = require("../utils/asyncHandler.js")
const {getTasks, createTasks, updateTasks, deleteTasks} = require("../controllers/taskController.js")

const validateObjectId = require("../middlewares/validateObjectId.js")

router.get("/",asyncHandler(getTasks))

router.post("/",asyncHandler(createTasks))

router.patch("/:id",validateObjectId, asyncHandler(updateTasks))

router.delete("/:id", validateObjectId, asyncHandler(deleteTasks))


module.exports = router