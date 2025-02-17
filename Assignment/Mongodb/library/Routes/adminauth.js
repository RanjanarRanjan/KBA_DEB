import { Router} from "express";
import { authenticate } from "../middleware/auth.js";
import { sample } from "../Models/samples.js";
import { books } from "../Models/samples.js";
import { admincheck } from "../middleware/admin.js";

const adminauth=Router();



adminauth.post("/addbook",authenticate,async(req,res)=>
    {
        try
        {
            if(req.user_role=='admin')
            {
            const {BookName,Author,Category,Language,Date,Description}=req.body
            const book=await books.findOne({BookName:BookName})
            if(book)
            {
                res.status(400).json({msg:"Book is already exist"})
            }
            else
            {
               const newbook=new books({
                    BookName:BookName,
                    Author:Author,
                    Category:Category,
                    Language:Language,
                    Date:Date,
                    Description:Description
                })
                await newbook.save()      
                res.status(201).send("Registration successfully")
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


adminauth.put("/updatebook",authenticate,async(req,res)=>
{
 try{
    if(req.user_role=='admin')
    {
        const {BookName,Author,Category,Language,Date,Description}=req.body
        const book=await books.findOne({BookName:BookName})
        if(book)
        {
            book.BookName=BookName,
            book.Author=Author,
            book.Category=Category,
            book.Language=Language,
            book.Date=Date,
            book.Description=Description
            await book.save()
            res.status(200).send("Successfully update a Book")
            
        }
        else
        {
            res.status(400).send("Book not found")
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

adminauth.get('/getbook',authenticate,async(req,res)=>
    {
        try{
            const name=req.query.BookName
            const result=await books.findOne({BookName:name})
            if(result)
            {
                res.json(result)
            }
            else{
                res.status(400).send("Book not found")
            }
        }
        catch
        {
            res.status(500).send("Server error")
        }
    })


    adminauth.get('/getallbook',authenticate,async(req,res)=>
        {
            try{
                const name=req.query.BookName
                const result=await books.find()
                if(result)
                {
                    res.json(result)
                }
                else{
                    res.status(400).send("No book Available")
                }
            }
            catch
            {
                res.status(500).send("Server error")
            }
        })   
    
    
adminauth.delete('/deletebook',authenticate,admincheck,async(req,res)=>
    {
        const  {BookName}=req.body      //or name=req.query.course_name
        const result=await books.findOne({BookName:BookName})
        if(BookName)
        {
            await books.findOneAndDelete({BookName:BookName})
            res.status(201).send("successfully")
        }
        else
        {
            res.status(404).send("Book is not found");
        }
})
export {adminauth}