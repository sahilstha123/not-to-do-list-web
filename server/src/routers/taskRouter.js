// src/routers/taskRouter.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler.js");
const { getTasks, createTasks, updateTasks, deleteTasks } = require("../controllers/taskController.js");
const validateObjectId = require("../middlewares/validateObjectId.js");

const { createTaskSchema, updateTaskSchema } = require("../validations/taskValidation.js");
const validateRequest = require("../validations/validateRequest.js");

// Routes
router.get("/", asyncHandler(getTasks));

router.post("/", validateRequest(createTaskSchema), asyncHandler(createTasks));

router.patch("/:id", validateObjectId, validateRequest(updateTaskSchema), asyncHandler(updateTasks));

router.delete("/", asyncHandler(deleteTasks));

module.exports = router;
