import { CommentModel } from "../../../../DB/model/comment.model.js";
import { postModel } from "../../../../DB/model/post.model.js";
import cloudinary from "../../../../service/cloudinary.js";
import { pagination } from "../../../../service/pigination.js";


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
    const {page , size} = req.query
    const {skip , limit }=  pagination(page , size)
    const cursor = postModel.find({}).limit(limit).skip(skip).cursor();

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

export const likePost = async (req,res)=>{
    const {postId} = req.params;
    const post = await postModel.findOneAndUpdate({_id: postId , likes:{$nin: req.user._id}}, {
        $push:{likes:req.user._id},
        $pull:{dislike:req.user._id},
        $inc:{totalCount:1}
    },{
        new:true
    })
    res.json({message:'Done' , post})
}

export const dislikePost = async (req,res)=>{
    const {postId} = req.params;
    const post = await postModel.findOneAndUpdate({_id:postId , dislike:{$nin:req.user._id}}, {
        $push:{dislike:req.user._id},
        $pull:{like:req.user._id},
        $inc:{totalCount:-1}
    },{
        new:true
    })
    res.json({message:'Done' , post})
}