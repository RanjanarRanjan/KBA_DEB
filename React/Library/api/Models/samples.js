import { Schema } from "mongoose";
import { model } from "mongoose";

const book=new Schema({
    BookName:{type:String,required:true},
    Author:{type:String,required:true},
    Category:{type:String,required:true},
    Description:{type:String,required:true},
    image:String,
    availability: { type: String, default: "Available" }
})
const books=model('books',book)

export {books}