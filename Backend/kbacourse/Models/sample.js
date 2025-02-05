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

export {sample};

