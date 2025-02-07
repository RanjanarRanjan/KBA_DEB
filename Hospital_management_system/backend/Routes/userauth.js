import {Router} from "express";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { signup } from "../Models/sample.js";


dotenv.config()


const userauth=Router();

userauth.post("/signup",async function(req,res)
{
    try{
    const {Username,Email,user_role,phone,dob,gender,password}=req.body
    const newpassword=await bcrypt.hash(password,10)

    const existingUser=await signup.findOne({Email:Email});

    if(existingUser)
    {
        res.status(400).send("UserName is already Exist");
    }
    else
    {  
        const newUser =new signup({
            fullname:Username,
            Email:Email,
            user_role: user_role,
            phone: phone,
            dob: dob,
            gender: gender,
            password: newpassword 
        })
        await newUser.save()      
        res.status(201).send("Registration successfully")
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
        const {Email,password}=req.body;
        const result=await signup.findOne({Email:Email});

        if(!result)
        {
            res.status(400).send("Enter avalid Email")
        }
        else
        {
            console.log(result.password);
            const valid=await bcrypt.compare(password,result.password);
            console.log(valid);
            if(valid)
            {
                const token=jwt.sign({Email:Email,user_role:result.user_role},process.env.SECRET_KEY,{expiresIn:'1h'});
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


userauth.get("/logout",(req,res)=>
    {
        res.clearCookie('authToken')
        res.status(200).json({msg:"Successfull"})
    })
    
    

export{userauth};

