const router=require("express").Router();
const verify=require("../routes/VerifyToken");
router.get("/",verify,(req,res)=>{
    res.json({
        post:{
            title:"my first post",
            description:"something inside here",
        }
    })
})
module.exports=router