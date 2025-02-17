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

userauth.get("/getprice",async function (req,res)
{
    try
    {
        const name=req.query.Price
        const result=await item.find({Price:name})
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


userauth.put("/updateitem",async function (req,res)
{
    try
    {
    const {ItemName,Category,Quantity,Price}=req.body
    const result=await item.findOne({ItemName:ItemName})
    if(result)
    {
            result.ItemName=ItemName, 
            result.Category=Category,
            result.Quantity=Quantity, 
            result.Price=Price 
            await result.save()
            res.status(200).send("Successfully update a Item")
    }
    else
    {
        res.status(400).send("item not found")
    }
   
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("server error")
    }
})

userauth.delete('/deleteitem',async function(req,res)
    {
        const  {ItemName}=req.body         
        const result=await item.findOne({ItemName:ItemName})
        if(result)
        {
            await item.findOneAndDelete({ItemName:ItemName})
            res.status(201).send("successfully")
        }
        else
        {
            res.status(404).send("Item not found");
        }
    })
    


export {userauth}