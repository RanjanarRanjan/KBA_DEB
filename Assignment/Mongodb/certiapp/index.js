import express,{json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userauth } from './Routes/userauth.js';
import { adminauth } from "./Routes/adminauth.js"

dotenv.config();
const app=express();

app.use(json())
app.use("/",userauth);
app.use("/",adminauth);

app.get("/",function(req,res)
{
    res.send("hello Everyone");
})


mongoose.connect('mongodb://localhost:27017/Certiapp').then(()=>{
    console.log("MongoDB connected successfully to Library")
})
.catch((error)=>{
    console.error("MongoDB connction failed",error)
})


app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
})

