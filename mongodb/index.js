import express,{json} from 'express';
import mongoose from 'mongoose'
import {router} from './routes.js'

const app=express();
const PORT=8000

app.use(json())
app.use('/',router)

app.listen(PORT,function(){
    console.log(`Server is listening at ${PORT}`)
})
mongoose.connect('mongodb://localhost:27017/demo')

