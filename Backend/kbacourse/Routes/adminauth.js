import { Router} from "express";
import {authenticate} from "../middleware/auth.js"

const adminauth=Router();
const course=new Map();


adminauth.post("/addcourse",authenticate,(req,res)=>
    {
        try
        {
            if(req.user_role=='admin')
            {
            const {course_name,course_id,course_type,description,course_price}=req.body
            //console.log(course_name,course_id,course_type,description,course_price)
            if(course.get(course_name))
            {
                // res.status(400).send("Course is already exist")
                res.status(400).json({msg:"Course is already exist"})
            }
            else
            {
                course.set(course_name,{course_id,course_type,description,course_price})
                res.status(201).send("successfully")
                console.log("admin")
                console.log(course.get(course_name))
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
    
    

export {adminauth}