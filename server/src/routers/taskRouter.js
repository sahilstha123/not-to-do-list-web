const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.status(200).json({
       
        message:"This is the get request"
    })
})
//post
router.post("/",(req,res)=>{
    res.status(200).json({
       
        message:"This is the post request"
    })
})

//put
router.put("/",(req,res)=>{
    res.status(200).json({
       
        message:"This is the put request"
    })
})

//delete
router.delete("/",(req,res)=>{
    res.status(200).json({
       
        message:"This is the delete request"
    })
})


module.exports = router