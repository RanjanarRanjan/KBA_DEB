import { Router} from "express";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const user = new Map();
const userauth=Router();

userauth.post("/signup",async function(req,res)
{
    try{
    const {UserName,user_role,Email,password}=req.body
    const newpassword=await bcrypt.hash(password,10)
    
    if(user.get(UserName))
    {
        res.status(400).send("UserName is already Exist");
    }
    else
    {
        user.set(UserName,{UserName,user_role,Email,password:newpassword});        
        res.status(201).send("Registration successfully")
        console.log(user.get(UserName))
    }
    }
    catch
    {
    res.status(500).send("server error")
    }

userauth.post('/login',async function(req,res)
{
    try
    {
        const {UserName,password}=req.body;
        const result=user.get(UserName);
        if(!result)
        {
            res.status(400).send("Enter avalid username")
        }
        else
        {
            const valid=await bcrypt.compare(password,result.password);
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
})
export{userauth};

