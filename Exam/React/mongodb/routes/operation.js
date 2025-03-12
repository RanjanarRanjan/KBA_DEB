import { Router } from "express";
import { item } from "../models/sample.js";


const userauth=Router()

userauth.post("/additem",async function (req,res)
{
    try
    {
    const {ItemName,Category,Quantity,Price}=req.body
    const result=await item.findOne({ItemName:ItemName})
    if(result)
    {
        res.status(400).send("item is already exist")
    }
    else
    {
        const newitem = new item({
            ItemName:ItemName, 
            Category:Category,
            Quantity:Quantity, 
            Price:Price 
        })
        await newitem.save()
        res.status(200).send("registration successfully")
    }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("server error")
    }
})

userauth.get("/getitem",async function (req,res)
{
    try
    {
        const name=req.query.Category
        const result=await item.find({Category:name})
        if(result)
        {
            res.json(result)
        }
        else
        {
            res.status(400).send("item not found")
           
        }
    }
    catch
    {
        console.log(error)
        res.status(500).send("server error")
    }

})

userauth.get("/getallitems",async function (req,res)
{
    try
    {
        const result1=await item.find()
        if(result1)
        {
            res.json(result1);
        }
        else
        {
            res.status(400).send("doctor not found")
        }
    }
    catch
    {
        res.status(500).send("Server error")
    }
})

export {userauth}