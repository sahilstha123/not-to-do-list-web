const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
let fakeTasksDb = []
router.get("/", (req, res) => {
  res.status(200).json({

    message: "This is the get request",
    tasks: fakeTasksDb
  })
})

//post
router.post("/", (req, res) => {

  try {
    const { tasks, hours } = req.body

    if (!tasks || !hours)
      return res.status(400).json({
        message: "Tasks and hours are rquired"
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

    if (!task)
      return res.status(404).json({
        message: "Tasks Not found"
      })
    if (type) {
      task.type = type
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: task
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Internal server error"
    })

  }
})

//delete
router.delete("/", (req, res) => {
  res.status(200).json({

    message: "This is the delete request"
  })
})


module.exports = router