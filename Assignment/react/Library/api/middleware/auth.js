// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'

// dotenv.config()

// const authenticate=(req,res,next)=>
// {
//     try{
//     const cookie = req.headers.cookie;
//     if(cookie)
//     {
//     console.log(cookie);
//     const [name,token]=cookie.trim().split("=")//here we use tuple to store the cookies after the separation
//     console.log("name=",name)
//     console.log("token =",token)
//     if(name=='authToken')//this code is only use for single token
//     {
//         const verified=jwt.verify(token,process.env.SECRET_KEY)//get the payload datetails
//         console.log(verified);
//         req.user_role=verified.user_role;
//         next();//go back to the route
//     }
//     else
//     {
//         res.status(401).send("Unautherized access")
//     }
//     }
//     else
//     {
//         res.status(400).send("bad request")
//     }
// }
//     catch
//     {
//     res.status(500).send("server error")
//     }
// }

// export {authenticate}

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticate = (req, res, next) => {
    try {
        const cookie = req.headers.cookie;
        if (!cookie) {
            return res.status(400).json({ msg: "Bad request: No token provided" });
        }

        console.log(cookie);
        const [name, token] = cookie.trim().split("="); // Splitting cookie value

        console.log("name=", name);
        console.log("token =", token);

        if (name !== "authToken") {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        const verified = jwt.verify(token, process.env.SECRET_KEY); // Verify token
        console.log(verified);

        req.user = verified; // Attach user details to request
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};

export { authenticate };
