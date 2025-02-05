import { Router} from "express";
import {authenticate} from "../middleware/auth.js"
import { admincheck } from "../middleware/admin.js";

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
    
//get method

//using params
// adminauth.get('/getcourse/:cname',(req,res)=>
// {
//     const name=req.params.cname
//     console.log(name)
// })


//using query
adminauth.get('/getcourse',(req,res)=>
{
    try{
        const name=req.query.coursename
        const result=course.get(name)
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

// adminauth.put("/updatecourse",authenticate,(req,res)=>
// {
//  try{
//     if(req.user_role=='admin')
//     {
//         const {course_name,course_id,course_type,description,course_price}=req.body
//         if(course.get(course_name))
//         {
//             course.set(course_name,{course_name,course_id,course_type,description,course_price})
//             res.status(200).send("Successfully update a course")
//             console.log(course.get(course_name))
//         }
//         else
//         {
//             res.status(400).send("Course not found")
//         }
//     }
//     else
//     {
//         res.status(401).send("unauthersized access")
//     }
//  }
//  catch
//  {
//      res.status(500).send("Server error")
//  }
// })
adminauth.patch("/updatecourse",authenticate,admincheck,(req,res)=>
{
    try{
        // if(req.user_role=='admin')
        // {
            const {course_name,course_price}=req.body
            console.log(course_name,course_price)
            const result=course.get(course_name)
            console.log(result);
            if(result)
            {
                course.set(course_name,{course_name,course_id:result.course_id,course_type:result.course_type,description:result.description,course_price})
                res.status(200).send("Successfully update a course")
                console.log(course.get(course_name))
            }
            else
            {
                res.status(400).send("Course not found")
            }
        }
        // else
        // {
        //     res.status(401).send("unauthersized access")
        // }
    //}
    catch
    {
        res.status(500).send("Server error")
    }
})


adminauth.delete('/deletecourse',authenticate,admincheck,(req,res)=>
{
    const  {course_name}=req.body      //or name=req.query.course_name
    console.log(course_name)        // console.log(name) 
    if(course.get(course_name))
    {
        course.delete(course_name)
        res.status(201).send("successfully")
    }
    else
    {
        res.status(404).send("course not found");
    }
})

export {adminauth}