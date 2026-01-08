const { z } = require("zod")

const createTaskSchema = z.object({
    task: z.string().min(3, "Task must be at least 3 character"),
    hours: z.number().min(1, "Hours must be at least 1hr ")
})

const updateTaskSchema = z.object({
    type:z.enum(["entry","bad"],{required_error: "Type is required"})
})

module.exports = {
    createTaskSchema,
    updateTaskSchema
}