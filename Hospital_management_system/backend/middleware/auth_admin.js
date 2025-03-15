import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authenticate=(req,res,next)=>
{
    try{
    const cookie = req.headers.cookie;
    if(cookie)
    {
    console.log(cookie);
    const [name,token]=cookie.trim().split("=")//here we use tuple to store the cookies after the separation
    console.log("name=",name)
    console.log("token =",token)
    if(name=='authToken')//this code is only use for single token
    {
        const verified=jwt.verify(token,process.env.SECRET_KEY)//get the payload datetails
        console.log(verified);
        req.user_id = verified._id;
        req.Email=verified.Email
        // req.UserName=verified.UserName;
        req.user_role=verified.user_role;
        //console.log(req.user_id)
        next();//go back to the route
    }
    else
    {
        res.status(401).send("Unautherized access")
    }
    }
    else
    {
        res.status(400).send("bad request")
    }
}
    catch
    {
    res.status(500).send("server error")
    }
}

export {authenticate}

