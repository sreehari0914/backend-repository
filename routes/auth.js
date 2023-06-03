const router=require("express").Router();
const User=require("../model/User");
const bcrypt = require("bcrypt");
const {registerValidation,loginValidation}=require("../validation");
const Jwt=require("jsonwebtoken");
require("dotenv/config");
router.get("/", (req, res) => {
    res.json("register");
});
router.post("/register", async (req, res) => {
    const {error}=registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const salt= await bcrypt.genSalt(10);
    const hashpassword= await bcrypt.hash(req.body.password,salt);
    const emailaldreadyexist=await  User.findOne({email:req.body.email});
    if(emailaldreadyexist){
        return res.status(400).send("email aldredy exists");
    }
    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        })
     try{
      const savedUser=  await user.save();
      res.status(200).send({user:savedUser._id})

     }
     catch(error){
        res.status(400).send({status:"Failed",msg:error});

     }
});

router.post('/login', async(req,res)=>{
    const {error}=loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const user=await  User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send("Invalid Email");
    }
    const validpassword= await bcrypt.compare(req.body.password,user.password);
    if(!validpassword){
        return res.status(200).send("Invalid Password");
    }
    const token= Jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header("auth-token",token).send(token);
})

module.exports=router