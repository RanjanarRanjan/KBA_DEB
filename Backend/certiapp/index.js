import express,{json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userauth } from './Routes/userauth.js';
import { adminauth } from "./Routes/adminauth.js"

dotenv.config();
const app=express();

app.use(cors({
    origin:'http://127.0.0.1:5500',
    credentials:true
}))


app.use(json())
app.use("/",userauth);
app.use("/",adminauth);

app.get("/",function(req,res)
{
    res.send("hello Everyone");
})

app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
})

