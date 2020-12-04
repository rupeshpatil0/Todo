
const {Todo ,validation} =require("../model/todo.js")
const auth=require("../middleware/auth")
const express =require("express")

const router=express.Router()

router.get("/",async (req,res)=>{
    const result = await Todo.find()
     res.send(result)
})

router.post("/",auth,async(req,res)=>{
    const {error} = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const todo =new Todo({
        task:req.body.task,
        isChecked:req.body.isChecked
    })

   await todo.save()
   res.send(todo)
})


router.put("/:id",auth,async(req,res)=>{
    let  {error} = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
          $set: {
              task: req.body.task,
              isChecked:req.body.isChecked
          },
  
      }, 
      {
        new: true
      })
  
      res.send(todo)
})
router.delete("/:id",auth,async(req,res)=>{
    const todo = await Todo.findByIdAndRemove(req.params.id)
  res.send(todo)
    
})



module.exports=router