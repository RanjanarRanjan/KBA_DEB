import { Router} from "express";
import bcrypt from "bcrypt"

const user = new Map
const userauth=Router();



userauth.get('/',function(req,res)//userauth is a variable
{
    res.send("hello Everyone");
})

userauth.post("/signup",function(req,res)
{
    // console.log(req.body);

    // const data=req.body
    // console.log(data.FirstName)
    
    const {FirstName,LastName,UserName,mail,password}=req.body
    console.log(FirstName);
    if(UserName!=='Ranjana Ranjan')
        {
            console.log("Username is already exist")
        }
        else{
    //user.set(UserName,{FirstName,LastName,UserName,mail,password});//<-before using bcrypt
    //console.log(user.get(UserName))//or //console.log(user.get('Ranjana Ranjan'))// it is used to get the values 
    const newpassword=bcrypt.hash(password,10)//without using bcrypt-> //const newpassword=bcrypt.hash(password,10)//hash has two param 
    console.log(newpassword)//new password is created
    user.set(UserName,{FirstName,LastName,UserName,mail,password:newpassword});
    console.log(user.get(UserName))

    }


})


export{userauth};




// {
//     "FirstName":"Ranjana",
//     "LastName":"Ranjan",
//     "UserName":"Ranjana Ranjan",
//     "mail":"Ranjan123@gmail.com",
//     "password":"1234"
//     }