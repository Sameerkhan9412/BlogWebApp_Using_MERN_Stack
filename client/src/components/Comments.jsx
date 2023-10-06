import styled from "@emotion/styled";
import { Box, Button, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import {
  addCommentInBlog,
  getAllComments,
} from "../services/operations/postApi";
import Comment from "./Comment";
import toast from "react-hot-toast";
const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;
const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;

const initialValues = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};

export const Comments = ({ post }) => {
  const url =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [comment, setComment] = useState([]);
  const { account } = useContext(DataContext);
  const [comm, setAllcomm] = useState({});
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await getAllComments(post._id);
      if (res.data.success) {
        setAllcomm(res.data.comments);
      }
    };
    getData();
  }, [post, toggle]);
  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async (e) => {
    const res = await addCommentInBlog(comment);
    if (!res.data.success) {
      toast.error(res.data.msg);
      return;
    }
    setComment(initialValues);
    toast.success(res.data.msg);
    setToggle((prevstate) => !prevstate);
  };

  return (
    <Box>
      <Container>
        <Image src={url} alt="DP" />
        <StyledTextArea
          minRows={5}
          placeholder={"what's your mind?"}
          value={comment.comments}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: 40 }}
          onClick={(e) => addComment(e)}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comm &&
          comm.length > 0 &&
          comm.map((comment) => (
            <Comment comment={comment} setToggle={setToggle} />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
