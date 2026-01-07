const express = require("express")
const morgan = require("morgan")
const app = express()
const taskRouter = require("./src/routers/taskRouter.js")
const connectMongoDb = require("./src/config/dbConfig.js")
connectMongoDb()
app.use(morgan("dev"))

app.use(express.json());

app.use("/api/v1/tasks",taskRouter)

app.listen(8001,()=>{
    console.log("server is running")
})