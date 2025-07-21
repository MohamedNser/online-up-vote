import { Schema , model } from "mongoose";

const userSchema = new Schema ({
    userName:{type:String , required:true},
    email:{type:String , unique:true,required:true},
    password:{type:String , required:true},
    age:Number,
    profilePic:String,
    coverPic:Array,
    gender:{type:String ,default:'Male' , enum:['Male' , 'Female']},
    phone:String ,
},{
    timestamps:true
})

export const userModel = model('User' , userSchema)
