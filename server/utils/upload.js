// const cloudinary = require('cloudinary').v2
// exports.upload  = async (file, folder, height, quality) => {
//     const options = {folder};
//     if(height) {
//         options.height = height;
//     }
//     if(quality) {
//         options.quality = quality;
//     }
//     options.resource_type = "auto";

//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }
import {GridFsStorage} from 'multer-gridfs-storage';
import multer from 'multer';
import dotenv from 'dotenv'
dotenv.config();
const storage=new GridFsStorage({
    url:process.env.URL,
    options:{useNewUrlParser:true},
    file:(req,file)=>{
        const match=["image/png" ,"image/jpg"];
        if(match.indexOf(file.memeType)===-1){
            return `${Date.now()}-blog-${file.originalname}`
        }
        return {
            bucketName:"photos",
            filename:`${Data.now()}-blog-${file.originalname}`
        }
    }
})
export default multer({storage});