import { Router } from "express";
import {sample} from './Models/sample.js'

var router=Router()
router.post('/create',async(req,res)=>{
    try{
        const data=req.body;
        const result=await sample.create(data);
        res.status(201).json(result)
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json();
    }
})

router.get("/read",async(req,res)=>{
    try{
        // const result=await sample.find()
        const result=await sample.findById("67a1cd44a8e8c144ca21d309")
        res.status(200).send(result)
    }
    catch(error){
        console.log(error);
        res.status(500).json();
    }
})
export {router};