const Joi =require('joi')
const mongoose =require('mongoose')
const config =require("config")
const jwt =require("jsonwebtoken")

const userschema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:70
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:255
    }
})

userschema.methods.getToken =function(){
   return jwt.sign({_id:this._id ,name:this.name},config.get("ThisIsPrivateKey"))
}

const User = mongoose.model("user",userschema)

function validateuser(body){
    const schemaU=Joi.object({
        name:Joi.string().min(3).max(70).required(),
        email:Joi.string().email().min(5).max(255).required(),
        password:Joi.string().min(6).max(255).required()
    })
    return schemaU.validate(body)
}

exports.User=User
exports.validateuser=validateuser