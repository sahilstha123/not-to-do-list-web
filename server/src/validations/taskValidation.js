const { z } = require("zod");

// Schema for creating a new task
const createTaskSchema = z.object({
  task: z
    .string({
      required_error: "Task is required",
      invalid_type_error: "Task must be a string",
    })
    .trim()
    .min(3, "Task must be at least 3 characters")
    .max(100, "Task cannot exceed 100 characters"), 
  hours: z
    .coerce.number({
      required_error: "Hours are required",
      invalid_type_error: "Hours must be a number",
    })
    .min(1, "Hours must be at least 1 hour")
    .max(24, "Hours cannot exceed 24"), 
});

// Schema for updating a task type (entry/bad)
const updateTaskSchema = z.object({
  type: z.enum(["entry", "bad"], {
    required_error: "Task type is required",
  }),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
