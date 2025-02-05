import {Router} from "express";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'//importing token
import dotenv from 'dotenv'
import { sample } from "../Models/sample.js";
//import {authenticate} from "../middleware/auth.js"

dotenv.config()

//const user = new Map();
const userauth=Router();
//const course=new Map();

// userauth.get('/',function(req,res)//userauth is a variable
// {
//     res.send("hello Everyone");
// })

userauth.post("/signup",async function(req,res)
{
    try{
    // console.log(req.body);

    // const data=req.body
    // console.log(data.FirstName)
    
    const {FirstName,LastName,UserName,mail,user_role,password}=req.body
    //user.set(UserName,{FirstName,LastName,UserName,mail,password});//<-before using bcrypt
    //console.log(user.get(UserName))//or //console.log(user.get('Ranjana Ranjan'))// it is used to get the values 
    const newpassword=await bcrypt.hash(password,10)//without using bcrypt-> //const newpassword=bcrypt.hash(password,10)//hash has two param 
    //console.log(newpassword)//new password is created
    
    const existingUser=await sample.findOne({UserName:UserName});

    if(existingUser)//if(user.get(UserName))->it use for map
    {
        res.status(400).send("UserName is already Exist");//using a status here
    }
    else
    {
        //user.set(UserName,{FirstName,LastName,UserName,mail,user_role,password:newpassword});
        const newUser =new sample({
            FirstName:FirstName,//schema name:postman
            LastName:LastName,
            UserName:UserName,
            mail:mail,
            user_role:user_role,
            password:newpassword
        })
        await newUser.save()      
        res.status(201).send("Registration successfully")
        //console.log(user.get(UserName))
    }
    }
    catch
    {
    res.status(500).send("server error")
    }
})


userauth.post('/login',async function(req,res)
{
    try
    {
        const {UserName,password}=req.body;
        //const result=user.get(UserName);
        const result=await sample.findOne({UserName:UserName});

        if(!result)
        {
            res.status(400).send("Enter avalid username")
        }
        else
        {
            console.log(result.password);
            const valid=await bcrypt.compare(password,result.password);//checking the password is same //
            console.log(valid);
            if(valid)
            {
                const token=jwt.sign({UserName:UserName,user_role:result.user_role},process.env.SECRET_KEY,{expiresIn:'1h'});//sign is called as payload
                console.log(token);
                res.cookie('authToken',token,
                {
                    httpOnly:true
                });
                res.status(200).send("success")
            }
            else
            {
                res.status(401).send("Unauthorized access")
            }
        }
       
    }
    catch
    {
        res.status(500).send("server Error")
    }
})

//it created in other router adminauth
// userauth.post("/addcourse",authenticate,(req,res)=>
// {
//     try
//     {
//         if(req.user_role=='admin')
//         {
//         const {course_name,course_id,course_type,description,course_price}=req.body
//         //console.log(course_name,course_id,course_type,description,course_price)
//         if(course.get(course_name))
//         {
//             // res.status(400).send("Course is already exist")
//             res.status(400).json({msg:"Course is already exist"})
//         }
//         else
//         {
//             course.set(course_name,{course_id,course_type,description,course_price})
//             res.status(201).send("successfully")
//             console.log("admin")
//             console.log(course.get(course_name))
//         }
//     }
//     else
//     {
//         res.status(403).send("only admin can login")
//     }
//     }
//     catch
//     {
//         res.status(500).send("server Error")
//     }
// })
userauth.get("/logout",(req,res)=>
{
    res.clearCookie('authToken')
    res.status(200).json({msg:"Successfull"})
})


export{userauth};

