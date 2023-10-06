import mongoose from "mongoose";
const commentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    Comment:{
        type:String,
        required:true,
    }
})

const comment=mongoose.model("comment",commentSchema)
export default comment;