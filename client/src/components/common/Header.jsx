import React from 'react'
import { AppBar,Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
const Component=styled(AppBar)`
    background:#fff;
    color:#000;
`
const Container=styled(Toolbar)`
    justify-content:center;
    &>a{
        padding:20px;
        color:black;
        text-decoration:none;
    }
`
const Header = () => {
  return (
   <Component>
    <Container>
        <Link to={'/home'}>HOME</Link>
        <Link to={'/about'}>ABOUT</Link>
        <Link to={'/contact'}>CONTACT</Link>
        <Link to={'/login'}>LOGOUT</Link>
    </Container>
    </Component>
  )
}

export default Header