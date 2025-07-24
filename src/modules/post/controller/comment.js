import { CommentModel } from "../../../../DB/model/comment.model.js";
import { postModel } from "../../../../DB/model/post.model.js";

export const comment = async(req,res)=>{
    const {text} = req.body;
    const {id} = req.params;
    const post = await postModel.findById(id)
    if (!post) {
        res.status(400).json({message: "post undefined"})
    } else {
        const comment = await CommentModel.create({text , userId: req.user._id , postId: post._id})
        // await postModel.updateOne({_id:id} ,{$push: {commentId:comment._id}})
        res.json({message:'Done' ,comment})
    }
    
}