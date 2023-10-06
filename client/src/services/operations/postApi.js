import {apiConnector} from "../apiConnector";
import {CreatePostEndpoints} from "../api";
import {toast} from "react-hot-toast"
const {
    UploadFile,
    createPost,
    getAllPost,
    getPostByCategory,
    getPost,
    deletePos,
    updateBlogPost,
    addComment,
    getBlogAllComments,
    deleteComment
} = CreatePostEndpoints;
export const uploadImg = async (data) => {
    try {
        const response = await apiConnector("POST", UploadFile, data);
        return response;

    } catch (error) {
        console.log(error);
    }
}


export const savePost = async (data) => {
    console.log(data);
    const response = apiConnector("POST", createPost, data);
    return response;
}

export const getAllPosts = async (category) => {
    if (category.category !== "") {
        const response = await apiConnector("POST", getPostByCategory, {category});
        return response.data;
    }
    const response = await apiConnector("GET", getAllPost);
    return response.data;
    // }
}
export const getPostById = async (id) => {
    const response = await apiConnector("POST", getPost, {id});
    return response.data;
}

export const updatePost = async (data) => {
    const response = apiConnector("POST", updateBlogPost, data);
    return response;
}
export const deletePost = async (id) => {
    const response = apiConnector("POST", deletePos, {id})
    return response;
}

export const addCommentInBlog = async (data) => {
    const response = apiConnector("POST", addComment, {data});
    return response;
}
export const getAllComments = async (id) => {
    const response = apiConnector("POST", getBlogAllComments, {id});
    return response;
}

export const deleteComments = async (id) => {
    const response = apiConnector("POST", deleteComment, {id})
    toast.success("delted successfuly ")
    return response;
}
