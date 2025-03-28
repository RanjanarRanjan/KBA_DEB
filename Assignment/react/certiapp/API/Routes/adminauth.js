import { Router} from "express";
import {authenticate} from "../middleware/auth.js"
import { sample } from "../Models/sample.js";

const adminauth=Router();



adminauth.post("/addcerti",authenticate,async(req,res)=>
    {
        try
        {
            // if(req.user_role=='admin')
            {
            const {certi_id,course_name,candidate_name,grade,date}=req.body
            const result=await sample.findOne({certi_id:certi_id});
            if(result)
            {
                res.status(400).json({msg:"Course is already exist"})
            }
            else
            {
                const newcerti = new sample({
                    certi_id:certi_id,
                    course_name:course_name,
                    candidate_name:candidate_name,
                    grade:grade,
                    date:date
                })
                await newcerti.save()
                res.status(201).send("successfully")
            }
        }
        // else
        // {
        //     res.status(403).send("only admin can login")
        // }
        }
        catch
        {
            res.status(500).send("server Error")
        }
    })

    adminauth.get('/getcerti',async(req,res)=>
        {
            try{
                const name=req.query.certi_id
                const result=await sample.findOne({certi_id:name})
                if(result)
                {
                    res.send(result)
                    console.log(result)
                }
                else{
                    res.status(400).send("Course not found")
                }
            }
            catch
            {
                res.status(500).send("Server error")
            }
        })
    
export {adminauth}