import express from 'express';
import { SignupUser, loginUser } from "../controllers/user-controller.js";
// import {signup} from '../controllers/Auth.js';
// import { SignupUser } from '../controllers/Auth.js';
const router=express.Router();
router.post("/signup",SignupUser);
router.post("/login",loginUser);
export default router;