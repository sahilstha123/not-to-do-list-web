const express = require("express");
const morgan = require("morgan");
const app = express();
const taskRouter = require("./src/routers/taskRouter.js");
const connectMongoDb = require("./src/config/dbConfig.js");
const cors = require("cors")
const path = require ("path")
const PORT = 8001

console.log(__dirname)
//serve the static file
app.use(express.static(path.join(__dirname,"../client/dist")))
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"../client/dist/index.html"))
})
connectMongoDb();

app.use(morgan("dev"));
app.use(express.json()); 

app.use(cors())
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url)
  next()
})


app.use("/api/v1/tasks", taskRouter);

app.use(require("./src/middlewares/errorHandler.js"));

app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});
