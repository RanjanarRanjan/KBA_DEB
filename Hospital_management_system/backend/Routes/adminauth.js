import { Router} from "express";
import {authenticate} from "../middleware/auth_admin.js"
import { admincheck } from "../middleware/admin_check.js";
import { doctor_creation } from "../Models/sample.js";


const adminauth=Router();

//add Doctor
adminauth.post("/add_doctor",authenticate,async(req,res)=>
    {
        try
        {
            if(req.user_role=='admin')
            {
            const {doctor_name,email,contact,working_days,time_schedules}=req.body
            const add_doctor=await doctor_creation.findOne({doctor_name:doctor_name})
           
            if(add_doctor)
            {
                res.status(400).json({msg:"Doctor name is already exist"})
            }
            else
            {
                const newdoctor = new doctor_creation({
                    doctor_name: doctor_name,
                    email: email,
                    contact: contact,
                    working_days: working_days,
                    time_schedules: time_schedules
                })
                await newdoctor.save()
                res.status(201).send("successfully")
                console.log("admin")
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
 
//view doctor
    adminauth.get('/getdoctor',authenticate,async(req,res)=>
        {
            try{
                const name=req.query.doctor_name
                const result1=await doctor_creation.findOne({doctor_name:name})
                if(result1)
                {
                    res.json(result1);
                    console.log(result1)
                }
                else{
                    res.status(400).send("doctor not found")
                }
            }
            catch
            {
                res.status(500).send("Server error")
            }
        })
        

//edit or update profile

adminauth.put("/updatedoctor",authenticate,admincheck,async(req,res)=>
    {
     try{
            const {doctor_name,email,contact,working_days,time_schedules}=req.body
            const result=await doctor_creation.findOne({doctor_name:doctor_name})
            if(result)
            {
                result.doctor_name=doctor_name,
                result.email=email,
                result.contact= contact,
                result.working_days=working_days,
                result.time_schedules=time_schedules
                await result.save()
                res.status(200).send("Successfully update a course")
            }
            else
            {
                res.status(400).send("Course not found")
            }
        }
     catch
     {
         res.status(500).send("Server error")
     }
    })


//delete doctor
adminauth.delete('/deletedoctor',authenticate,admincheck,async(req,res)=>
    {
        const  {doctor_name}=req.body          
        const result=await doctor_creation.findOne({doctor_name:doctor_name})
        if(result)
        {
            await doctor_creation.findOneAndDelete({doctor_name:doctor_name})
            res.status(201).send("successfully")
        }
        else
        {
            res.status(404).send("doctor not found");
        }
    })
    


export {adminauth}