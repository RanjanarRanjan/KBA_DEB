const admincheck=(req,res,next)=>
    {
        if(req.user_role=='admin')
        {
            next()
        }
        else
        {
            res.status(401).send("unautherized access")
        }
    }
    
    export {admincheck}