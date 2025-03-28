import { Schema } from "mongoose";
import { model } from "mongoose";


const demo=new Schema({
        UserName:{type:String,required:true},
        Email:{type:String,required:true},
        // user_role:{type:String,required:true},
        password:{type:String,required:true}        
})
const sign=model('userdetails',demo)


const certificate=new Schema({
    certi_id:{type:String,required:true},
    course_name:{type:String,required:true},
    candidate_name:{type:String,required:true},
    grade:{type:String,required:true},
    date:{type:String,required:true}
})
const sample=model('isssue',certificate)

export {sign , sample}