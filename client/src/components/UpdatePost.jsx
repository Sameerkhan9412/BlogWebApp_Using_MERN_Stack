import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
// import {AddCircle as Add} from '@mui/icons-material';
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  uploadImg,
  getPostById,
  savePost,
  updatePost,
} from "../services/operations/postApi";
// import {DataContext} from "../context/DataProvider"
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";

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
const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
const StyledInputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;
const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
const initialPostData = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};
const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPostData);
  const [file, setFile] = useState("yes");
  const { account } = useContext(DataContext);
  const url = post.picture
    ? post.picture
    : "https://media.istockphoto.com/id/1059649304/photo/hand-of-businessman-using-laptop-with-icon-social-media-and-social-network-online-marketing.webp?b=1&s=612x612&w=0&k=20&c=pw8XPWnK2yslDhwFKoglGqeqEZpWlMAOk4FTXGjVg-g=";
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = await getPostById(id);
      if (response.success) {
        setPost(response.post);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        // api call
        const response = await uploadImg(data);
        if (response) {
          post.picture = response.imageUrl;
        }
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const updatePoste = async () => {
    const res = await updatePost(post);
    if(!res.data.success){
      toast.error(res.data.msg);
      return;
    }
    toast.success(res.data.msg)
    navigate(`/details/${id}`);
  };

  return (
    <Container>
      <Image src={url} alt="POST BANNNER" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddIcon fontSize="large" color="action" />
        </label>
        <input
          type="file"
          name=""
          style={{ display: "none" }}
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <StyledInputTextField
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
          value={post.title}
        />
        <Button variant="contained" onClick={() => updatePoste()}>
          Update
        </Button>
      </StyledFormControl>
      <Textarea
        minRows={5}
        placeholder="Tell your story..."
        onChange={(e) => handleChange(e)}
        name="description"
        value={post.description}
      ></Textarea>
    </Container>
  );
};
export default CreatePost;
