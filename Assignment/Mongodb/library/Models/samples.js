import { Schema } from "mongoose";
import { model } from "mongoose";

const demo=new Schema({
    UserName:{type:String,required:true},
    mail:{type:String,required:true,unique:true},
    user_role:{type:String,required:true},
    password:{type:String,required:true}
});
const sample=model('userdetails',demo)

const book=new Schema({
    BookName:{type:String,required:true},
    Author:{type:String,required:true},
    Category:{type:String,required:true},
    Language:{type:String,required:true},
    Date:{type:String,required:true},
    Description:{type:String,required:true}
})
const books=model('books',book)

export {sample,books}