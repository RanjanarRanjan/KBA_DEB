import { Router} from "express";
import {authenticate} from "../middleware/auth.js"
import { admincheck } from "../middleware/admin.js";
import { sample1 } from "../Models/sample.js";
import upload from "../middleware/upload.js";

const adminauth=Router();
//const course=new Map();


adminauth.post("/addcourse",authenticate,upload.single("courseImage") ,async(req,res)=>
    {
        try
        {
            if(req.user_role=='admin')
            {
            const {course_name,course_id,course_type,description,course_price}=req.body
            const addcourse=await sample1.findOne({c_id:course_id})
            //console.log(course_name,course_id,course_type,description,course_price)
            if(addcourse)//if(course.get(course_name))
            {
                // res.status(400).send("Course is already exist")
                res.status(400).json({msg:"Course is already exist"})
            }
            else
            {
                const imagePath=req.file?req.file.path:""

                //course.set(course_name,{course_id,course_type,description,course_price})
                const newcourse = new sample1({
                    c_name:course_name,
                    c_id:course_id,
                    c_type:course_type,
                    description:description,
                    course_price:course_price,
                    image:imagePath
                })
                await newcourse.save()
                res.status(201).send("successfully")
                console.log("admin")
                //console.log(course.get(course_name))
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
adminauth.get('/getcourse',async(req,res)=>
{
    try{
        const name=req.query.coursename
        //const result=course.get(name)
        const result1=await sample1.findOne({c_name:name})
        if(result1)
        {
            //res.send(result)
            res.json(result1);
            console.log(result1)
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



adminauth.put("/updatecourse",authenticate,admincheck,async(req,res)=>
{
 try{
    // if(req.user_role=='admin')
    // {
        const {course_name,course_id,course_type,description,course_price}=req.body
        const result=await sample1.findOne({c_name:course_name})
        if(result)//if(course.get(course_name))
        {
            result.c_name=course_name,
            result.c_id=course_id,
            result.c_type=course_type,
            result.description=description,
            result.course_price=course_price 
            await result.save()
            //course.set(course_name,{course_name,course_id,course_type,description,course_price})
            res.status(200).send("Successfully update a course")
            //console.log(course.get(course_name))
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




adminauth.patch("/updatecourse",authenticate,async(req,res)=>
{
    try{
        if(req.user_role=='admin')
        {
            const {course_name,course_price}=req.body
            const result=await sample1.findOne({c_name:course_name})
            //console.log(course_name,course_price)
            //const result=course.get(course_name)
            //console.log(result);
            if(result)
            {
                result.c_name=course_name,

                result.course_price=course_price 
                await result.save()
                //course.set(course_name,{course_name,course_id:result.course_id,course_type:result.course_type,description:result.description,course_price})
                res.status(200).send("Successfully update a course")
                //console.log(course.get(course_name))
            }
            else
            {
                res.status(400).send("Course not found")
            }
        }
        else
        {
            res.status(401).send("unauthersized access")
        }
    }
    catch
    {
        res.status(500).send("Server error")
    }
})


adminauth.delete('/deletecourse',authenticate,admincheck,async(req,res)=>
{
    const  {course_name}=req.body      //or name=req.query.course_name
    console.log(course_name)        // console.log(name) 
    const result=await sample1.findOne({c_name:course_name})
    if(result)//if(course.get(course_name))
    {
        //course.delete(course_name)
        await sample1.findOneAndDelete({c_name:course_name})
        res.status(201).send("successfully")
    }
    else
    {
        res.status(404).send("course not found");
    }
})

export {adminauth}