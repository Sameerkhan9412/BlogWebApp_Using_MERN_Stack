import express from 'express';
import { SignupUser, loginUser } from "../controllers/user-controller.js";
import { uploadImage,getImage} from '../controllers/image-controller.js';
import { createPost,getAllPosts, getPostByCatgry,getPost,updatePost, deletePost} from '../controllers/post-controller.js';
import {newComment,getComments, deleteComment} from "../controllers/comment-controller.js"
import { authenticateToken } from '../controllers/jwt-controller.js';
import upload from '../utils/upload.js'
const router=express.Router();
router.post("/signup",SignupUser);
router.post("/login",loginUser);
router.post("/file/upload",upload.single('file'), uploadImage);
router.get("/file/:filename",getImage)
router.post("/create",createPost)
// router.get("/posts",authenticateToken,getAllPosts);
router.get("/posts",getAllPosts);
router.post("/postsbycategory",getPostByCatgry);
router.post("/post",getPost);
router.post("/update",updatePost);
router.post("/delete",deletePost);
router.post("/addcomment/new",newComment);
router.post("/comments",getComments);
router.post("/deletecomment",deleteComment);
export default router;