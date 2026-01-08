const TaskCollection = require("../models/Task.js")
// get all the tasks
exports.getTasks = async (req, res) => {
  
    const tasks = await TaskCollection.find()
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: tasks
    })

}

// create a new Tasks

exports.createTasks = async (req, res) => {

    const { task, hours, } = req.body
  
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

}

// update a tasks
exports.updateTasks = async (req, res) => {

    const { id } = req.params
    const { type } = req.body

    const updatedTask = await TaskCollection.findByIdAndUpdate(id,
      { type },
      { new: true, runValidators: true }
    )

    if (!updatedTask)
      return res.status(404).json({
        success: false,
        message: "Task not found"
      })

    res.status(200).json({
      success: true,
      message: "Type Update successfully",
      data: updatedTask
    })

}

//Delete a Tasks

exports.deleteTasks = async (req, res) => {

    const { id } = req.params

    const deletedTask = await TaskCollection.findByIdAndDelete(id)

    if (!deletedTask)
      return res.status(404).json({
        success: false,
        message: "Task Not found"
      })

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask

    })
}