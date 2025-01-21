import express,{json} from 'express';
import dotenv from 'dotenv';
import { userauth } from './Routes/userauth.js';
// import { json } from 'express';

dotenv.config();

const app=express();

app.use(json())
app.use("/",userauth);


app.get("/",function(req,res)
{
    res.send("hello Everyone");
})

// app.post("/signup",function(req,res)
// {
//     console.log(req.body);
// })

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
