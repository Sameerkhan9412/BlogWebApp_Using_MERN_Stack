import bcrypt from 'bcrypt';
import User from '../model/user.js';
import jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';
dotenv.config();
export const SignupUser = async (request, response) => {
    try { 
        // const salt=await bcrypt.genSalt();
        const {name, username, password} = request.body;
        if(!name||!username || !password){
            return response.status(200).json({success:false,msg:"please fill all the required field"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return response.status(200).json({success: false, msg: "user is already exist"})
        }
        const newUser = await User.create({name, username, password:hashedPassword});
        // await newUser.save();
        return response.status(200).json({success: true, msg: "signup successfully"})
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, msg: "error while signup the user"})
    }
}
export const loginUser = async (request, response) => {
    try { 
        const {username, password} = request.body;
        if(!username||!password){
            return response.status(200).json({
                success:false,
                msg:"please fill all the field"
            })
        }
        // const newUser = await User.findOne({username});
        const existingUser = await User.findOne({username});
        if(!existingUser){
            return response.status(200).json({
                success:false,
                msg:"Username does not exist"
            })
        }
        const match=await bcrypt.compare(password,existingUser.password);
        if(match){
           const accessToken=jwt.sign(existingUser.toJSON(),process.env.ACCESS_SECRET_KEY,{
            expiresIn:'15m'
           });
           const refreshToken=jwt.sign(existingUser.toJSON(),process.env.REFRESH_SECRET_KEY);
           const newToken=new Token({token:refreshToken})
           await newToken.save();
           return response.status(200).json({
            success:true,
            accessToken:accessToken,
            refreshToken:refreshToken,name:existingUser.name,username:existingUser.username,
            msg:"login successfully"
           })
        }
        else{
            return response.status(400).json({success: false, msg: "Password does not match"})
        }
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, msg: "error while login"})
    }
}
