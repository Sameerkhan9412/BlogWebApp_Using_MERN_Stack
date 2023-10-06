import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import { deleteComments } from "../services/operations/postApi";
const Component = styled(Box)`
  margin-top: 30px;
  background-color: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`;

const StyleDate = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;

const DeleteStyle = styled(DeleteIcon)`
  margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const removeComment = async () => {
    const response = await deleteComments(comment._id);
    if (response.data.success) {
      console.log(response.data.success);
      setToggle((prevState) => !prevState);
    }
  };
  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyleDate>{new Date(comment.date).toDateString()}</StyleDate>
        {comment.name === account.username && (
          <DeleteStyle onClick={() => removeComment()} />
        )}
      </Container>
      <Box>
        <Typography>{comment.Comment}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;
