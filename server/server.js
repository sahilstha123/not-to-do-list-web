const express = require("express")
const app = express()


app.get("/",(req,res)=>{
    res.json({
        message:"This is a get request"
    })
})
app.listen(8001,()=>{
    console.log("server is running")
})