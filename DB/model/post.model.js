import { Schema , model ,Types} from "mongoose";

const postSchema = new Schema ({
    title:{type:String , required:true},
    caption:{type:String , unique:true,required:true},
    images:{type:Array , required:true},
    userId:{type:Types.ObjectId , ref:'User' ,required:true},
    age:Number,
    likes:[{type:Types.ObjectId , ref:'User'}],
    dislike:[{type:Types.ObjectId , ref:'User'}],
    totalCount:[{type:Number , default:0}]
    // commentId:[{type:Types.ObjectId , ref:'comment'}]
},{
    timestamps:true
})

postSchema.post('findOneAndUpdate', async function() {
    console.log(this);
    console.log(this.getQuery()._id);
    const docToUpdate = await this.model.findOne({_id:this.getQuery()._id});
    console.log(docToUpdate.likes.length); // The document that `findOneAndUpdate()` will modify
    console.log(docToUpdate.dislike.length); // The document that `findOneAndUpdate()` will modify
    docToUpdate.totalCount = docToUpdate.likes.length - docToUpdate.dislike.length
    console.log(docToUpdate); 
    docToUpdate.save()

});

export const postModel = model('post' , postSchema)
