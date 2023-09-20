import mongoose from 'mongoose';
import dotenv from 'dotenv';
const  Connection=()=>{
    mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("DB connection is successfully"))
.catch((error)=>{
    console.log("DB connection failed");
    console.log(error);
})};
export default Connection;