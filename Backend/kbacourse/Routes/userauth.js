import { Router } from "express";


const userauth=Router();


userauth.get('/',function(req,res)//userauth is a variable
{
    res.send("hello Everyone");
})

export{userauth};