import { Schema } from "mongoose";
import { model } from "mongoose";


const demo=new Schema({
    ItemName:String ,
    Category:String,
    Quantity:Number, 
    Price:Number 
})
const item=model("items",demo)

export {item}