import {Schema} from 'mongoose'
import {model} from 'mongoose'

const demo=new Schema({
    FirstName:String,
    LastName:String,
    UserName:{type:String,required:true,unique:true},
    mail:{type:String,required:true},
    user_role:{type:String,required:true},
    password:{type:String,required:true}
});
const sample=model('userdetails',demo)//demo is just a variable to store we can change this

const add=new Schema({
    c_name:{type:String,required:true},
    c_id:{type:String,required:true,unique:true},
    c_type:{type:String,required:true},
    description:{type:String,required:true},
    course_price:{type:String,required:true} 
})
const sample1=model('addcourse',add)

export {sample};
export {sample1};

