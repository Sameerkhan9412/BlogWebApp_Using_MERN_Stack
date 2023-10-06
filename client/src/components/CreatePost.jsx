import styled from "@emotion/styled";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  Select,
  TextareaAutosize,
  InputLabel,
  MenuItem,
} from "@mui/material";
// import {AddCircle as Add} from '@mui/icons-material';
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { uploadImg, savePost } from "../services/operations/postApi";
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";
import { categories } from "../constant/data";
import toast from "react-hot-toast";
const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: "5px 10px",
  },
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

const SelectCat=styled(FormControl)`
  margin:3px 1px;
`
const initialPostData = {
  title: "",
  description: "",
  picture: "",
  username: "",
  category: "",
  createdDate: new Date(),
};
const CreatePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPostData);
  const [file, setFile] = useState("yes");
  const { account } = useContext(DataContext);
  const [category, setCategory] = useState('');
  const url = post.picture
    ? post.picture
    : "https://media.istockphoto.com/id/1059649304/photo/hand-of-businessman-using-laptop-with-icon-social-media-and-social-network-online-marketing.webp?b=1&s=612x612&w=0&k=20&c=pw8XPWnK2yslDhwFKoglGqeqEZpWlMAOk4FTXGjVg-g=";
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        // api call
        const response = await uploadImg(data);
        if (!response.data.success) {
          return;
        } else {
          post.picture = response.data.imageUrl;
        }
      }
    };
    getImage();
    post.username = account.username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
   };
  const savePostee = async () => {
    post.category=category;
    const res = await savePost(post);
    if (!res.data.success) {
      toast.error(res.data.msg);
      return;
    }
    toast.success(res.data.msg);
    navigate("/home");
  };
  

  const handleChooseCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
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
        />
        <Button variant="contained" onClick={() => savePostee()}>
          Publish
        </Button>
      </StyledFormControl>
      <SelectCat  variant="standard" fullWidth >
        <InputLabel id="demo-simple-select-standard-label">Choose Cateogory</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleChooseCategory}
          label="Category"
          name="category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            categories.map((category)=>{
                return <MenuItem value={category.type}>{category.type}</MenuItem>
            })
          }
        </Select>
        </SelectCat>
      <Textarea
        minRows={5}
        placeholder="Tell your story..."
        onChange={(e) => handleChange(e)}
        name="description"
      ></Textarea>
    </Container>
  );
};
export default CreatePost;
