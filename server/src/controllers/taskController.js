const TaskCollection = require("../models/Task.js")

// get all the tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskCollection.find()
    if (!tasks)
      return res.status(404).json({
        success: false,
        message: "Tasks not found"
      })
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      tasks
    })

  } catch (error) {
    console.error(error)
  }
}

// create a new Tasks

exports.createTasks = async (req, res) => {
  try {
    console.log(req.body, "-------")
    const { task, hours, } = req.body
    if (!task || !hours || typeof hours !== "number") {
      res.status(400).json({
        success: false,
        message: "Invalid input"
      })
    }
    const existingTask = await TaskCollection.findOne({ task: task.trim() })
    if (existingTask)
      return res.status(409).json({
        success: false,
        message: "Task already exist"
      })
    const newTask = await TaskCollection.create({
      task: task.trim(),
      hours,

    })
    console.log("new Task", newTask)
    res.status(201).json({
      success: true,
      message: "New tasks has been added successfully",
      data: newTask
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server error" })

  }

}

// update a tasks
exports.updateTasks = async (req, res) => {

  try {
    const { id } = req.params
    const { type } = req.body

    const task = await TaskCollection.findById(id)
    console.log("---patch---", task)

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found"
      })

    if (type) {
      task.type = type
    }

    await task.save()

    res.status(200).json({
      success: true,
      message: "Type Update successfully",
      data: task
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server error" })
  }
}