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
    const { tasks, hours } = req.body;

    // Validate input
    if (!tasks || !hours) {
      return res.status(400).json({ message: "Tasks and Hours are required" });
    }

    // Check for existing task (case-insensitive)
    const existingTask = fakeTasksDb.find(
      (item) => item.tasks.toLowerCase() === tasks.toLowerCase()
    );

    if (existingTask) {
      return res.status(409).json({ message: "Task already exists" });
    }

    // Create new task
    const newTask = {
      id: uuidv4(),
      tasks,
      hours,
      type: "entry",
    };

    fakeTasksDb.push(newTask);

    res.status(201).json({
      message: "Task added successfully",
      task: newTask,
    });

    console.log(fakeTasksDb);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//put
router.put("/", (req, res) => {
    res.status(200).json({

        message: "This is the put request"
    })
})

//delete
router.delete("/", (req, res) => {
    res.status(200).json({

        message: "This is the delete request"
    })
})


module.exports = router