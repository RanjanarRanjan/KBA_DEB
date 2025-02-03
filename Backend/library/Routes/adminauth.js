import { Router} from "express";
import { authenticate } from "../middleware/auth.js";
//import {authenticate} from "../middleware/auth.js"

const adminauth=Router();
const book=new Map();


adminauth.post("/addbook",authenticate,(req,res)=>
    {
        try
        {
            if(req.user_role=='admin')
            {
            const {BookName,Author,Category,Language,Date,Description}=req.body
            //console.log(course_name,course_id,course_type,description,course_price)
            if(book.get(BookName))
            {
                // res.status(400).send("Course is already exist")
                res.status(400).json({msg:"Course is already exist"})
            }
            else
            {
                book.set(BookName,{BookName,Author,Category,Language,Date,Description})
                res.status(201).send("successfully")
                console.log("admin")
                console.log(book.get(BookName))
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


adminauth.put("/updatebook",authenticate,(req,res)=>
{
 try{
    if(req.user_role=='admin')
    {
        const {BookName,Author,Category,Language,Date,Description}=req.body
        if(book.get(BookName))
        {
            book.set(BookName,{BookName,Author,Category,Language,Date,Description})
            res.status(200).send("Successfully update a course")
            console.log(book.get(BookName))
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

adminauth.get('/getbook',(req,res)=>
    {
        try{
            const name=req.query.BookName
            const result=book.get(name)
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
    
    
adminauth.delete('/deletebook',authenticate,(req,res)=>
    {
        const  {BookName}=req.body      //or name=req.query.course_name
        console.log(BookName)        // console.log(name) 
        if(book.get(BookName))
        {
            book.delete(BookName)
            res.status(201).send("successfully")
        }
        else
        {
            res.status(404).send("course not found");
        }
})
export {adminauth}