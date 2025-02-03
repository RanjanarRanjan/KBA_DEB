import { Router} from "express";
import {authenticate} from "../middleware/auth.js"

const adminauth=Router();
const certi=new Map();


adminauth.post("/addcerti",authenticate,(req,res)=>
    {
        try
        {
            if(req.user_role=='admin')
            {
            const {certi_id,course_name,candidate_name,grade,date}=req.body
            console.log(certi_id,course_name,candidate_name,grade,date)
            if(certi.get(certi_id))
            {
                // res.status(400).send("Course is already exist")
                res.status(400).json({msg:"Course is already exist"})
            }
            else
            {
                certi.set(certi_id,{certi_id,course_name,candidate_name,grade,date})
                res.status(201).send("successfully")
                console.log("admin")
                console.log(certi.get(certi_id))
            }
        }
        else
        {
            res.status(403).send("only admin can login")
        }
        }
        catch
        {
            res.status(500).send("server Error")
        }
    })

    adminauth.get('/getcerti',(req,res)=>
        {
            try{
                const name=req.query.certi_id
                const result=certi.get(name)
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