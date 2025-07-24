import { CommentModel } from "../../../../DB/model/comment.model.js";
import { postModel } from "../../../../DB/model/post.model.js";
import cloudinary from "../../../../service/cloudinary.js"
import { comment } from "./comment.js";


export const post = async(req,res)=>{
    if (!req.files) {
        res.stauts(400).json({message: 'image required'})
    } else {
        const {title , caption} = req.body;
        const images = []
        for (const file of req.files) {
        const {secure_url} = await cloudinary.uploader.upload(file.path , {folder: `gallery/${req.user._id}/post`})
        images.push(secure_url)
        }
        const post = await postModel.create({title , caption , userId: req.user._id , images})
        res.json({message:'Done' ,post})
    }
    
}

export const getPosts = async(req,res)=>{
    const postList = []
    const cursor = postModel.find({}).cursor();

for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    console.log(doc);

    const comment = await CommentModel.find({postId: doc._id }).populate([{
        path:'userId',
        select:"userName profilePic"
    }])
    const convertTo = doc.toObject()
    convertTo.comment = comment 
    console.log(convertTo);
    postList.push(convertTo)
    
}
res.json({message:"DONE" , postList})
}