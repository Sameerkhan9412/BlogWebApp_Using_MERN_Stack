import './App.css';
import toast, {Toaster} from 'react-hot-toast';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import { SouthAmericaRounded } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import DataProvider from './context/DataProvider';
import Header from './components/common/Header';
import Login from './components/Login';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import UpdatePost from './components/UpdatePost';
import DetailsView from './components/DetailsView';
import CreatePost from './components/CreatePost';
const PrivateRoute=({isAuthenticated,...props})=>{
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated &&token?
  <>
  <Header/>
  <Outlet/>
  </>
  :<Navigate replace to='/login'/>
}
const theme=createTheme();
function App() {
  const [isAuthenticated,setAuthenticated]=useState(false)
    return (
        <DataProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <div style={
                    {marginTop: 64}
                }>
                    <Toaster/>
                    <Routes>
                        <Route path='/login'
                            element={<Login setAuthenticated={setAuthenticated}/>}/>
                            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}/>
                        <Route path='/'
                            element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                              <Route path='/home' element={<Home/>}/> 
                            </Route>
                        <Route path='/create'
                            element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                              <Route path='/create' element={<CreatePost/>}/> 
                            </Route>
                        <Route path='/details/:id'
                            element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                              <Route path='/details/:id' element={<DetailsView/>}/> 
                            </Route>
                        <Route path='/update/:id'
                            element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                              <Route path='/update/:id' element={<UpdatePost/>}/> 
                            </Route>
                              <Route path='/About' element={<About/>}/> 
                              <Route path='/Contact' element={<Contact/>}/> 
                    </Routes>
                </div>
            </BrowserRouter>
            </ThemeProvider>
        </DataProvider>
    );
}

export default App;
