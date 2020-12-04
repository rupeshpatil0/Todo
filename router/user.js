const bcrypt =require("bcrypt")
const {User ,validateuser} =require("../model/user")
const express =require("express")

const router =express.Router()


router.post("/",async(req,res)=>{
const {error}=validateuser(req.body)
if(error) return res.status(400).send(error.details[0].message)

const isUser = await User.findOne({email:req.body.email})
if (isUser) return res.status(400).send("user already registered")

const user =new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
})

 const salt = await bcrypt.genSalt(10)
 user.password =await bcrypt.hash(user.password ,salt)

await user.save()

const token = user.getToken()
    res.header("x-auth",token).send({
        name: user.name,
        email: user.email
    })
})



module.exports =router