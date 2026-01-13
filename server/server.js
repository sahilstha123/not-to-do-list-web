const express = require("express");
const morgan = require("morgan");
const app = express();
const taskRouter = require("./src/routers/taskRouter.js");
const connectMongoDb = require("./src/config/dbConfig.js");
const cors = require("cors")

connectMongoDb();

app.use(morgan("dev"));
app.use(express.json()); 
app.use(cors())

app.use("/api/v1/tasks", taskRouter);

app.use(require("./src/middlewares/errorHandler.js"));

app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
