const mongoose =require('mongoose')
const Joi =require('joi')
 




const schema =new mongoose.Schema({
    task: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },

    isChecked:{
        type:Boolean,
        required:true
    },

    date: {
        type: Date,
        default: Date.now()
    },


})

const Todo = mongoose.model("todo",schema )

function validation(body){
const schemaJ =Joi.object({
    task:Joi.string().min(3).max(200).required(),
    isChecked:Joi.boolean()
    
})

return schemaJ.validate(body)
}

exports.Todo=Todo
exports.validation=validation