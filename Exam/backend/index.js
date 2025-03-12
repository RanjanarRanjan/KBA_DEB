import express, { json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
//import { userauth } from './routes/userauth.js'

import cors from 'cors'

dotenv.config()

const app = express()


app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json())

//app.use("/",userauth)


app.get("/",function(req,res)
{
    res.send("hello Everyone");
})


mongoose.connect('mongodb://localhost:27017/Exam').then(()=>{
    console.log("MongoDB connected successfully to Exam")
})
.catch((error)=>{
    console.error("MongoDB connction failed",error)
})

app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is connected!" });
});


app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
})
