const {User} =require("../model/user")

const bcrypt =require("bcrypt")
const Joi =require("joi")
const express =require("express")

const router =express.Router()


router.post("/",async(req,res)=>{
const {error}=validate(req.body)
if(error) return res.status(400).send(error.details[0].message)

const isUser = await User.findOne({email:req.body.email})
if (!isUser) return res.status(400).send("email or password is not valid")

const isPassword =await bcrypt.compare(req.body.password ,isUser.password)
if(!isPassword) return res.status(400).send("email or password is not valid")

const token =isUser.getToken()
res.header("x-auth",token).send(token)
})




function validate(req){
const schema =Joi.object({
   email:Joi.string().min(5).max(50).required(),
   password:Joi.string().min(5).max(50).required() 
})

return schema.validate(req)
}

module.exports=router