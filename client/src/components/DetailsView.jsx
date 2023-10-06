import { Box, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useParams ,Link, useNavigate} from "react-router-dom";
import banner from "../assets/banner.png";
import { getPostById,deletePost } from "../services/operations/postApi";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataContext } from "../context/DataProvider";
import Comments from "./Comments";
import toast from "react-hot-toast";
const Container = styled(Box)(({theme})=>({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]:{
    margin:'5px 10px',
  }
}));

const Image = styled("img")`
  width: 100%;
  height: 50vh;
  object-fit: cover;
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0px 10px 0px;
  word-break:break-word;
`;

const EditBtn = styled(EditIcon)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteBtn = styled(DeleteIcon)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Author=styled(Box)`
  color:#878787
  margin:20px 0;
  display:flex;
`
const Description=styled(Typography)`
  word-break:break-word;
`

const DetailsView = () => {
  // const url="https://cdn.pixabay.com/photo/2016/07/07/08/18/logo-1502039_1280.jpg"
  const { id } = useParams();
  const [post, setPost] = useState({});
  const account = useContext(DataContext);
  const navigate=useNavigate();
  let url = post.picture ? post.picture : banner;
  useEffect(
    () => {
      const fetchData = async () => {
        const data = await getPostById(id);
        setPost(data.post);
      };
      fetchData();
    },
    [ id ]
  );

    const deleteBlog=async()=>{
      let response=await deletePost(id);
      if(response.data.success){
        toast.success(response.data.msg);
        navigate("/home");
      }
      else{
        toast.error(response.data.msg);
      }
    }

  return (
    <Container>
      <Image src={url} alt="blogg image" />
      <Box style={{ float: "right"  }}>
        {account.account.username === post.username && (
          <>
           <Link to={`/update/${post._id}`} ><EditBtn style={{ color: "primary" }} /></Link>
           <DeleteBtn onClick={()=>deleteBlog()} color="error"  />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Typography>Author: <Box component={"span"} style={{fontWeight:600}}>{post.username}</Box></Typography>
        <Typography style={{marginLeft:"auto"}}>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>
      <Description>{post.description}</Description>
      <Comments post={post}/>
    </Container >
  );
};
export default DetailsView;
