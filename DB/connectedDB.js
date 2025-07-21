import mongoose from "mongoose";

const connectedDB =async()=>{
    return await mongoose.connect(process.env.BASEURI).then(res=>{
        console.log(`DateBase server connected`);
        
    }).catch(err=>{
        console.log('database connection failed ');
        
    })
} 

export default connectedDB