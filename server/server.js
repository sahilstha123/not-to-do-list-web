const express = require("express")
const app = express()
const taskRouter = require("./src/routers/taskRouter.js")

app.use("/api/v1/tasks",taskRouter)
app.listen(8001,()=>{
    console.log("server is running")
})