
require("express-async-errors")
const winston =require("winston")
const todo=require("./router/todo")
const user=require("./router/user")
const auth =require("./router/auth")
const error=require("./middleware/err")
const config =require('config')
const mongoose=require("mongoose")
const express =require("express")

const app=express()


winston.exceptions.handle(new winston.transports.File({ filename: 'exceptions.log' }))

process.on("unhandledRejection",(err)=>{
    throw err
})

winston.add(new winston.transports.File({filename:"logfile.log"}))

if(!config.get("ThisIsPrivateKey")){
    console.log("Private key is not set")
    process.exit(1)
}
   

mongoose.connect(config.get('db'),{ useUnifiedTopology: true },{ useNewUrlParser: true } )
    .then(() => console.log("succesfully connected to database...."))
    .catch((err) => console.log("connection failed ....", err.message))

app.use(express.json())
app.use('/',todo)
app.use('/user',user)
app.use('/auth',auth)

app.use(error)

const port=process.env.PORT ||3001
app.listen(port,()=>{
    console.log(`server is running on port ${port}....`)
})