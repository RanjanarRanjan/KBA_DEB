const usercheck=(req,res,next)=>
    {
        if(req.user_role=='user')
        {
            next()
        }
        else
        {
            res.status(401).send("unautherized access")
        }
    }
    
    export {usercheck}