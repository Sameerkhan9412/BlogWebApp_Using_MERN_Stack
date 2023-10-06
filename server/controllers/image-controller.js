import mongoose from 'mongoose';
import grid from 'gridfs-stream'
import dotenv from 'dotenv'
const backURL=process.env.BECKEND_URL;
dotenv.config();
const conn=mongoose.connection;
let gfs,gridfsBucket;
conn.once('open',()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    })
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('fs');

})
export const uploadImage=(req,res)=>{
    if(!req.file){
        return res.status(200).json({success:false,msg:"please select an image"});
    }
    const imageUrl=`${backURL}/blog/file/${req.file.filename}`; 
    return res.status(200).json({imageUrl,success:true})
}
export const getImage=async(req,res)=>{
    try {
        const file=await gfs.files.findOne({filename:req.params.filename});
        const readStream=gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }

}