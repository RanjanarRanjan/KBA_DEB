import { Router} from "express";
import {authenticate} from "../middleware/auth_admin.js"
import { admincheck } from "../middleware/admin_check.js";
import { doctor_creation, signup } from "../Models/sample.js";
import { upload } from "../middleware/upload.js";


const adminauth=Router();

const convertToBase64 =(buffer)=>{
    return buffer.toString("Base64")
}

//add Doctor
adminauth.post("/add_doctor",authenticate,upload.single("doctorImage"),async(req,res)=>
    {
        try
        {
            if(req.user_role=='admin')
            {
            const {doctor_name,email,contact,working_days,time_schedules}=req.body
            
            const parsedWorkingDays = JSON.parse(working_days);
            const parsedTimeSchedules = JSON.parse(time_schedules);

            const add_doctor=await doctor_creation.findOne({doctor_name:doctor_name})
           
            if(add_doctor)
            {
                res.status(400).json({msg:"Doctor name is already exist"})
            }
            else
            {
                let imagePath=null
                if(req.file)
                {
                    imagePath=convertToBase64(req.file.buffer)
                }
                const newdoctor = new doctor_creation({
                    doctor_name,
                    email,
                    contact,
                    working_days: parsedWorkingDays,
                    time_schedules: parsedTimeSchedules,
                    image: imagePath
                });
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
        catch(error)
        { console.log();
        
            res.status(500).send("server Error")
        }
    })
 
//view doctor
    adminauth.get('/getdoctor',authenticate,admincheck,async(req,res)=>
        {
            try{
                //const name=req.query.doctor_name
                const result1=await doctor_creation.find()
                if(result1)
                {
                    res.json(result1);
                    //console.log(result1)
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

adminauth.put("/updatedoctor",authenticate,admincheck,upload.single("doctorImage"),async(req,res)=>
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
                result.time_schedules=time_schedules;

                if (req.file) {
                    result.image = req.file.buffer.toString("Base64");
                }
                await result.save()
                res.status(200).send("Successfully update a Doctor")
            }
            else
            {
                res.status(400).send("Doctor not found")
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
    
    adminauth.get('/userdetailstoget',authenticate,admincheck,async(req,res)=>
        {
            try{
                const result2=await signup.find().select('-password');
                if(result2)
                {
                    res.json(result2);
                }
                else{
                    res.status(400).send("user not found")
                }
            }
            catch (error) {
                console.error("Authentication Error:", error);
                res.status(500).send("Server error");
            }
        })
        

export {adminauth}