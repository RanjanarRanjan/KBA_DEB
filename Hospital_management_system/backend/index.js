import express, { json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/adminauth.js'
import {appointment} from './Routes/appointment.js'
import cors from 'cors'

dotenv.config()

const app = express()


app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json())

app.use("/",userauth)
app.use("/",adminauth)
app.use("/",appointment)


app.get("/",function(req,res)
{
    res.send("hello Everyone");
})

mongoose.connect('mongodb://mongodb:27017/Hospital').then(()=>{
    console.log("MongoDB connected successfully to Hospital")
})
.catch((error)=>{
    console.error("MongoDB connction failed",error)
})


app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
})
