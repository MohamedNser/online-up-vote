import { Schema , model ,Types} from "mongoose";

const postSchema = new Schema ({
    title:{type:String , required:true},
    caption:{type:String , unique:true,required:true},
    images:{type:Array , required:true},
    userId:{type:Types.ObjectId , ref:'User' ,required:true},
    age:Number,
    likes:[{type:Types.ObjectId , ref:'User'}],
    dislike:[{type:Types.ObjectId , ref:'User'}],
    // commentId:[{type:Types.ObjectId , ref:'comment'}]
},{
    timestamps:true
})

export const postModel = model('post' , postSchema)
