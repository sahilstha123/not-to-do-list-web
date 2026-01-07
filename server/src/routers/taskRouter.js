const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
let fakeTasksDb = []


// get
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tasks fetched succesfully",
    tasks: fakeTasksDb
  })
})

//post
router.post("/", (req, res) => {

  try {
    const { tasks, hours } = req.body

    if (!tasks || !hours || typeof hours !== 'number' || tasks.trim() === "")
      return res.status(400).json({
        success: false,
        message: "Invalid Input"
      })
    const existingData = fakeTasksDb.find((item) => item.tasks.toLowerCase() === tasks.toLowerCase())
    if (existingData)
      return res.status(409).json({
        message: "Tasks already exists"
      })
    const newData = {
      id: uuidv4(),
      tasks,
      hours,
      type: "entry"
    }
    fakeTasksDb.push(newData)
    res.status(201).json({
      success: true,
      message: "New tasks has been added successfully",
      data: newData
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server error" })

  }

})

//patch
router.patch("/:id", (req, res) => {
  try {
    const { id } = req.params
    const { type } = req.body

    const task = fakeTasksDb.find((item) => item.id == id)
    console.log("tasks",task)

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Tasks Not found"
      })
    if (type) {
      task.type = type
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })

  }
})

//delete
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params

    const findIndex = fakeTasksDb.findIndex((item) => item.id === id)

    if (findIndex == -1)
      return res.status(404).json({
        success: false,
        message: "Task not found"
      })
    const deltedTask = fakeTasksDb.splice(findIndex, 1)

    res.status(200).json({
      success: true,
      message: "Tasks deleted successfully",
      data: deltedTask
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Internal server error"
    })

  }
})


module.exports = router