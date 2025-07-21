import { Schema , model ,Types} from "mongoose";

const postSchema = new Schema ({
    title:{type:String , required:true},
    caption:{type:String , unique:true,required:true},
    images:Array,
    userId:{type:Types.ObjectId , ref:'User' ,required:true},
    age:Number,
    likes:[{type:Types.ObjectId , ref:'User'}],
    dislike:[{type:Types.ObjectId , ref:'User'}]
},{
    timestamps:true
})

export const postModel = model('post' , postSchema)
