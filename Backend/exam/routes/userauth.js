import { Router } from "express";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken' 
import { signup } from "../models/sample.js";
import bcrypt from 'bcrypt'
import { authenticate } from "../middleware/auth.js";


dotenv.config()

const userauth = Router()

userauth.post("/signup",async function (req,res) 
{
    try
    {
    const {Username,user_role,Age,Password}=req.body
    const newpassword = await bcrypt.hash(Password,10)
    const result = await signup.findOne({username:Username})
    if(result)
    {
        res.status(400).send("user already exist")
    }
    else
    {
        const newuser = new signup({
            username : Username,
            user_role:user_role,
            age:Age,
            password:newpassword
        })
        await newuser.save()
        res.status(200).send("registration succesfully")
    }  
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("Server Error")
    } 
     
})

userauth.post("/login",async (req,res)=>
{
    const {Username,Password}=req.body
    const result=await signup.findOne({username:Username})
    if(!result)
    {
        res.status(400).send("invalid username")
    }
    else
    {
        const valid = await bcrypt.compare(Password,result.password)
        if(valid)
        {
            const token=jwt.sign({_id:result.id,username:Username,user_role:result.user_role},process.env.SECRET_KEY,{expiresIn:'1h'})
            res.cookie("authToken",token,{httpOnly:true})
            res.status(200).send("succes")
        }
    }
})


userauth.get("/get",authenticate,async function (req,res)
{
    const result=await signup.findOne({_id:req.user_id})
    if(!result)
    {
        res.status(400).send("user not found")
    }
    else
    {
        res.json(result)
    }
})

userauth.patch("/update",authenticate,async (req,res)=>
{
    try{
    const {Username,user_role}=req.body
    const result=await signup.findOne({username:Username})
    if(result)
    {
        result.username=Username,
        result.user_role=user_role
        await result.save()
        res.status(200).send("Successfully update a user")
    }
    else
    {
        res.status(400).send("user not found")
    }}
    catch(error)
    {
        console.log(error);
        res.status(500).send("server error")
        
    }
})

export {userauth}