import React from 'react'
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'
// import { addEllipses } from '../../utils/common-utils'
import { addEllipses } from '../utils/common-utils.js';
import {useSearchParams} from 'react-router-dom';

const Container=styled(Box)`
  border:1px solid #d3cede;
  border-radius:10px;
  margin:10px;
  display:flex;
  align-items:center;
  flex-direction:column;
  &>img,&>p{
    padding:0 5px 5px 5px;
  }
`
const Text=styled(Typography)`
  color:blue;
  font-weight:700;
`
const Parent=styled('div')`
width:100%;
  display:flex;
  justify-content:space-between;
`
const Image=styled("img")({
  width:'100%',
  aspectRatio:16/9,
  borderRadius:' 10px',
  objectFit:'cover',
})
const Post = ({post}) => {

  const url=post.picture?post.picture:"https://cdn.pixabay.com/photo/2017/01/18/08/25/social-media-1989152_1280.jpg";


  return (
    <Container>
      <Image src={url} alt="blog image" />
      <Text>{post.title.length>36?post.title.substring(0,32)+"...":post.title}</Text>
      <Typography>{post.description.length>48?post.description.substring(0,50)+"...":post.description}</Typography>
      <Parent>
      <Typography style={{color:'red'}} >{post.categories}</Typography>
      {/* <Typography>{addEllipses(post.title,20)}</Typography> */}
      <Typography style={{color:'green'}}>{post.username}</Typography>
      </Parent>
      {/* <Typography>{addEllipses(post.description)}</Typography> */}
    </Container>
  )
}

export default Post