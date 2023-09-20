import { apiConnector } from "../apiConnector";
import { AuthEndpoints } from "../api";
import toast from "react-hot-toast";
const {SIGNUP_API,LOGIN_API}=AuthEndpoints;
export const signup=async(signupData)=>{
  try {
    const {name,username,password}=signupData;
    const response=await apiConnector("POST",SIGNUP_API,{
        name,username,password
    });
    response.data.success?toast.success(response.data.msg):toast.error(response.data.msg);
    return response;

  } catch (error) {
    
    toast.error("signup failed");
  }
}
export const login=async(loginData)=>{
  try {
    const {username,password}=loginData;
    const response=await apiConnector("POST",LOGIN_API,{
        username,password
    });
    response.data.success?toast.success(response.data.msg):toast.error(response.data.msg);
    return response;

  } catch (error) {
    
    toast.error("signup failed");
  }
}