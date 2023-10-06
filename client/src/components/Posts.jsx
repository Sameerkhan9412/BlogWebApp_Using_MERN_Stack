import { useEffect, useState } from "react";
import { getAllPosts } from "../services/operations/postApi";
import {Box, Grid} from "@mui/material";
import Post from "./Post.jsx";
import { Link, useSearchParams } from "react-router-dom";
const Posts=()=>{
    const [posts,setPosts]=useState([]);
    const [searchParams]=useSearchParams()
    const category=searchParams.get('category');
    useEffect(()=>{
        const fetchData=async()=>{
            const getpostss=await getAllPosts({category:category || ''});
            if(getpostss.success===true){
                setPosts(getpostss.posts)
            }
        }
        fetchData();
    },[category])
    return (
       <>
        {
            posts && posts.length>0 ? posts.map(post=>(
                <Grid item lg={3} sm={4} xs={12}>
                    <Link to={`../details/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
                    <Post post={post}/>
                    </Link>
                </Grid>
            )):<Box style={{color:'#878787' ,margin:'30px 80px', fontSize:18 }}>No data is available to display</Box>
        }
       </>
    )
}
export default Posts;