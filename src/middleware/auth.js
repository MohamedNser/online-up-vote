import jwt from "jsonwebtoken"
import { userModel } from "../../DB/model/user.model.js";
export const auth = ()=>{
    return async (req , res , next)=>{
        const {authorization} = req.headers;
        if (!authorization?.startswith(process.env.BERERTOKEN)) {
            res.stauts(400).json({message:"in-valid bearer  token "})
        } else {
            const token = authorization.split(process.env.BERERTOKEN)[1] 
            const decoded = jwt.verify(token ,process.env.AUTHTOKEN )
            if (!decoded?.id || !decoded?.IsLoggedIn) {
                res.stauts(400).json({message:'in-valid token payload'})
            } else {
                const user = await userModel.findById(decoded?.id).select('name email profilePic')
                if (!user) {
                res.stauts(401).json({message:"not register user"}) 
                } else {
                    req.user = user
                    next()
                }
            }
        }
    }
}