import { Schema , model } from "mongoose";

const userSchema = new Schema ({
    userName:{type:String , required:true},
    email:{type:String , unique:true,required:true},
    password:{type:String , required:true},
    age:Number,
    profilePic:Array,
    coverPic:Array,
    gender:{type:String ,default:'Male' , enum:['Male' , 'Female']},
    phone:String ,
    role:{type:String , default:"User"}
},{
    timestamps:true
})

export const userModel = model('User' , userSchema)
