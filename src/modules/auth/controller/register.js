import { userModel } from "../../../../DB/model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { sendEmails } from "../../../../service/email.js";

export const signup = async(req,res)=>{
try {
    const {email , name , password} = req.body;
    const user = await userModel.findOne({email}).select('email')
    if (user) {
        res.json({message:'IN-valid email exist'})
    } else {
        const hash = bcrypt.hashSync(password ,parseInt(process.env.SALTROUND) )
        const savedUser = await userModel.create({userName: name , email , password:hash})
        if (!savedUser) {
            res.stauts(400).json({message:'fail to register yout account'})
        } else {
            const token = jwt.sign({id: savedUser._id} ,process.env.TOKENEMAILSUGNTURE, {expiresIn:'1h'})
            const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
            
            sendEmails(email , 'confirmationEmail' , ` <div style="font-family: Arial, sans-serif;">
        <h2>verify Email</h2>
        <p>confirmation Email</p>
        <a href="${link}" style="background-color: blue; color: white; padding: 10px 20px; 
        text-decoration: none; border-radius: 5px;">click here to confirm your Email</a> 
    </div>`)
    res.json({message:'done'})
        }
    }
} catch (error) {
    res.json({message:"catch error" , error})
    console.log(error);
    
}
    
}
export const confirmEmail = async(req,res)=>{
    try {
        const {token} = req.params;
    const decoded = jwt.verify(token , process.env.TOKENEMAILSUGNTURE)
    if (!decoded?.id) {
        res.stauts(400).json({message:"in-valid token payload"})
    } else {
        const user = await userModel.findByIdAndUpdate({_id: decoded.id , confirmEmail: false} , {confirmEmail:true})
        if (!user) {
            res.stauts(400).json({message:'already confirmed'})
        } else {
            res.json({message:'plz login'})
        }
    }
    } catch (error) {
        res.json({message:'catch errr' , error})
        console.log(error);
        
    }
    
}
export const signin = async(req,res)=>{
try {
    const {email ,  password} = req.body;
    const user = await userModel.findOne({email})
    if (!user) {
        res.stauts(400).json({message:'IN-valid email exsist'})
        if (user.confirmEmail) {
        res.status(400).json({message:'confirm email first'})
        }
    } else {
        const compare = bcrypt.compareSync(password ,user.password )
        if (!compare) {
            res.stauts(400).json({message:'invalid password'})
        } else {
            const token = jwt.sign({id: user._id , IsLoggedIn: true} ,process.env.AUTHTOKEN, {expiresIn:'24h'})
            res.json({message:'done', token})
        }
    }
} catch (error) {
    res.json({message:"catch error" , error})
    console.log(error);
    
}
    
}