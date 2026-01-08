const express = require("express")
const router = express.Router()

const {getTasks, createTasks, updateTasks} = require("../controllers/taskController.js")


router.get("/",getTasks)

router.post("/",createTasks)

router.patch("/:id",updateTasks)



// //delete
// router.delete("/:id", (req, res) => {
//   try {
//     const { id } = req.params

//     const findIndex = fakeTasksDb.findIndex((item) => item.id === id)

//     if (findIndex == -1)
//       return res.status(404).json({
//         success: false,
//         message: "Task not found"
//       })
//     const deltedTask = fakeTasksDb.splice(findIndex, 1)

//     res.status(200).json({
//       success: true,
//       message: "Tasks deleted successfully",
//       data: deltedTask
//     })

//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       message: "Internal server error"
//     })

//   }
// })


module.exports = router