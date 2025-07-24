import { userModel } from "../../../../DB/model/user.model.js"
import cloudinary from '../../../../service/cloudinary.js'


export const profile = async(req,res)=>{
    const user = await userModel.findById(req.user._id)
    res.json({message: "user module" , user})
}

export const profilePic = async(req,res)=>{
    try {
        if(!req.file){
            res.status(400).json({message:'please upload Your profile pic'})
        }else{
            const {secure_url} =await cloudinary.uploader.upload(req.file.path, {folder:`user/${req.user._id}/profilePic`})
            const user = await userModel.findOneAndUpdate({_id:req.user._id} , {profilePic:secure_url})
            res.status(200).json({message:'Done', user})
        }
    } catch (error) {
        res.status(404).json({message:'catch error ' , error})
    }
}

export const profileCoverPic = async(req,res)=>{
    try {
        if(!req.files){
            res.status(400).json({message:'please upload Your profile pic'})
        }else{
            const images = []
            for (const file of req.files) {
                const {secure_url} =await cloudinary.uploader.upload(file.path, {folder:`user/${req.user._id}/profileCoverPic`})
                images.push (secure_url)
            }
            
            const user = await userModel.findOneAndUpdate({_id:req.user._id} , {coverPic:secure_url})
            res.status(200).json({message:'Done'})
        }
    } catch (error) {
        res.status(404).json({message:'catch error ' , error})
    }
}