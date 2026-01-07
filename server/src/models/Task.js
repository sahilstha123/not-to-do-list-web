const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
    },
    hours: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["entry", "bad"],
        default: "entry"
    }
}, { timestamps: true })
const TaskCollection = mongoose.model("tasks", taskSchema)

module.exports = TaskCollection