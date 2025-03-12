import express,{json} from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { userauth } from './routes/operation.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(json())
app.use("/",userauth)


app.use(cors({
    origin:'*',
    credentials:true
}))


app.get("/",function (req,res)
{
    res.send("hello everyone")
})


mongoose.connect('mongodb://localhost:27017/Inventory2').then(()=>{
    console.log("MongoDB connected successfully to Inventory2")
})
.catch((error)=>{
    console.error("MongoDB connction failed",error)
})


// app.get("/api/test", (req, res) => {
//     res.json({ message: "Backend is connected!" });
// });


app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
})