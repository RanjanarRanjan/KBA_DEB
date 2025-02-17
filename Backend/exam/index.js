import express,{ json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { userauth } from './routes/userauth.js'

dotenv.config()

const app = express()

app.use(json())
app.use("/",userauth)

app.get("/",function(req,res)
{
    res.send("hello Everyon")
})

app.listen(process.env.PORT,function(req,res)
{
    console.log(`server is ${process.env.PORT}`)
})

mongoose.connect("mongodb://localhost:27017/exam").then(()=>{
    console.log("mongodb connected")
})
.catch((error)=>{
    console.log("connction failed",error)
})

