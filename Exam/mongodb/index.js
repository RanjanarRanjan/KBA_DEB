import express,{json} from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { userauth } from './routes/operation.js'

dotenv.config()

const app = express()

app.use(json())
app.use("/",userauth)

app.get("/",function (req,res)
{
    res.send("hello everyone")
})


mongoose.connect('mongodb://localhost:27017/Inventory').then(()=>{
    console.log("MongoDB connected successfully to Inventory")
})
.catch((error)=>{
    console.error("MongoDB connction failed",error)
})


app.listen(process.env.PORT,function(){
    console.log(`Server is listening at ${process.env.PORT}`)
})