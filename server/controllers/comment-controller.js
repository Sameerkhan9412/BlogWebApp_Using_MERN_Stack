import Comment from "../model/comment.js"
export const newComment=async(req,res)=>{
    try {
        const {name,postId,date,comments}=req.body.data;
        if(!comments){
            return res.status(200).json({
                success:false,
                msg:"please fill the comment filed"
            })
        }
        const newComment=new Comment({
            name:name,
            postId:postId,
            date:date,
            Comment:comments
        })
        newComment.save();
        res.status(200).json({
                success:true,
            msg:'comment saved sucessfully',
            data:newComment
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export const getComments =async(req,res)=>{
    try {
        const comments=await Comment.find({postId:req.body.id})
        return res.status(200).json({
            success:true,
            message:"comment fetched sucessfully",
            comments
        })

    } catch (error) {
         res.status(500).json({
            success:false,
            error:error.message,
            message:"error in comment conteoller dureing fatched"
         }
         )
    }
}

export const deleteComment=async(req,res)=>{
    console.log(req.body.id)
    try {
        const comment=await Comment.findById(req.body.id);
        if(!comment){
            return res.status(404).json({
                success:false,
                msg:"comment not found"
            })
        }
        await Comment.findByIdAndDelete(req.body.id);
        return res.status(200).json({
            success:true,
            msg:"comment deleted successfully",
        })

    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
}
