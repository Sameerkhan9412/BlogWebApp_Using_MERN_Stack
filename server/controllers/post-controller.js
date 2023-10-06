
import Post from "../model/post.js";
export const createPost=async(req,res)=>{
    try{
        const {title,description,picture,username,category,createdDate}=req.body;
        if(!title||!description||!category){
            return res.status(200).json({
                success:false,
                msg:"please filled all the fileds"
            })
        }
        const newPost=await Post.create({title,description,picture,username,categories:category,createdDate});
        return res.status(200).json({
            success:true,msg:"post saved successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            msg:"hello"
        })
    }
}
export const getAllPosts=async(req,res)=>{
    const {category}=req.body;
    try {
        let posts=await Post.find({});
        return res.status(200).json({
            success:true,
            msg:"post fetch successfully",
            posts
        })
    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
}
export const getPostByCatgry=async(req,res)=>{
    let category=req.body.category.category
    try {
        let posts=await Post.find({categories:category});
        return res.status(200).json({
            success:true,
            msg:"post fetch successfully",
            posts
        })
    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
}
export const getPost=async(req,res)=>{
    console.log("this is fpost id",req.body.id);
    try {
        let post=await Post.findById(req.body.id);
        return res.status(200).json({
            success:true,
            msg:"post fetch successfully",
            post
        })
    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
}
export const updatePost=async(req,res)=>{
    try {
        let post=await Post.findById(req.body._id);
        if(!post){
            return res.status(404).json({
                success:false,
                msg:"post not found"
            })
        }
        await Post.findByIdAndUpdate(req.body._id,{$set:req.body})
        return res.status(200).json({
            success:true,
            msg:"post update successfully",
        })
    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
}

export const deletePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.body.id);
        if(!post){
            return res.status(404).json({
                success:false,
                msg:"post not found"
            })
        }
        await Post.findByIdAndDelete(req.body.id);
        return res.status(200).json({
            success:true,
            msg:"post deleted successfully",
        })

    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
}

