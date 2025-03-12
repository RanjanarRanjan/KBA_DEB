import express,{json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userauth } from './Routes/userauth.js';
import { adminauth } from "./Routes/adminauth.js"
import { adminsign } from './Routes/adminsign.js';
import mongoose from 'mongoose';
// import { json } from 'express';

dotenv.config();

const app=express();

app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json())
app.use("/",userauth);
app.use("/",adminauth);//app.use("/api",adminauth)-->ttp://127.0.0.1:8000/api/addcourse
app.use("/admin",adminsign) // use this in postman http://127.0.0.1:8000/admin/signup


app.get("/",function(req,res)
{
    res.send("hello Everyone");
})

// app.post("/signup",function(req,res)
// {
//     console.log(req.body);
// })

mongoose.connect('mongodb://mongodb:27017/KBACourse').then(()=>{
    console.log("MongoDB connected successfully to KBACourse")
})
.catch((error)=>{
    console.error("MongoDB connction failed",error)
})


app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
})

//without using env
// app.listen(8000,function(){
//     console.log("Server is listening at 8000")
// })//callback function  



//WITHOUT USING EXPRESS

// import http from 'http';

// // Create an HTTP server
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Server is running');
// });

// // Listen on port 8000
// server.listen(8000, () => {
//     console.log('Server is listening at 8000');
// });
