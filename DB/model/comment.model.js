
import { Schema , model ,Types} from "mongoose";

const CommentSchema = new Schema ({
    text:{type:String ,required:true},
    userId:{type:Types.ObjectId , ref:'User' ,required:true},
    postId:{type:Types.ObjectId , ref:'post' ,required:true}

},{
    timestamps:true
})

export const CommentModel = model('comment' , CommentSchema)
