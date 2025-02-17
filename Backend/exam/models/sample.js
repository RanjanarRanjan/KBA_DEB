import { Schema } from "mongoose";
import { model } from "mongoose";

const demo = new Schema({
    username : {type:String,required:true,unique:true},
    user_role:String,
    age:Number,
    password:{type:String,required:true}
})
const signup=model("user",demo)

export {signup}