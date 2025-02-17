import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const authenticate=(req,res,next)=>
{
try{
    const cookie=req.headers.cookie
    if(cookie)
        {
            const [name,token]=cookie.trim().split("=")
            console.log("name = ",name)
            console.log("token=",token)
            if(name=='authToken')
            {
                console.log("hllo")
                const verified=jwt.verify(token,process.env.SECRET_KEY)
                console.log(verified)
                req.username=verified.username,
                req.user_role=verified.user_role,
                req.user_id=verified._id

                next()
            }
            else
            {
                res.status(401).send("unautherzed acces")
            }
        }
    else
    {
        res.status(400).send("bad request")
    }
}
catch(error)
{
    res.status(500).send("server error")
    console.log(error)
}
}

export {authenticate}