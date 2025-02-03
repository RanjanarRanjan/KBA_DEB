import { Router} from "express";
//import {authenticate} from "../middleware/auth.js"

const adminauth=Router();
const movie=new Map();


adminauth.post("/moive",(req,res)=>
    {
        try
        {
            if(req.user_role=='admin')
            {
            const {certi_id,course_name,candidate_name,grade,date}=req.body
            //console.log(course_name,course_id,course_type,description,course_price)
            if(movie.get(certi_id))
            {
                // res.status(400).send("Course is already exist")
                res.status(400).json({msg:"Course is already exist"})
            }
            else
            {
                movie.set(certi_id,{certi_id,course_name,candidate_name,grade,date})
                res.status(201).send("successfully")
                console.log("admin")
                console.log(movie.get(certi_id))
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