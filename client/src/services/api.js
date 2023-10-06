// const BASE_URL  =process.env.REACT_APP_BASE_URL;
const BASE_URL="http://localhost:8000/blog";

// AUTH ENDPOINTS
export const AuthEndpoints={
    SIGNUP_API:BASE_URL+"/signup",
    LOGIN_API:BASE_URL+"/login",
}
export const CreatePostEndpoints={
    UploadFile:BASE_URL+"/file/upload",
    createPost:BASE_URL+"/create",
    getAllPost:BASE_URL+"/posts",
    getPostByCategory:BASE_URL+"/postsbycategory",
    getPost:BASE_URL+"/post",
    updateBlogPost:BASE_URL+"/update",
    deletePos:BASE_URL+"/delete",
    addComment:BASE_URL+"/addcomment/new",
    getBlogAllComments:BASE_URL+"/comments",
    deleteComment:BASE_URL+"/deletecomment",
    
}
