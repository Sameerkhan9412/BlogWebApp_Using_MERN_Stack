import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState ,useContext} from "react";
import { signup,login } from "../../services/operations/authApi";
// import { DataContext } from "../../context/DataProvider";

import bgImg from "../../assets/banner.png";
import toast from "react-hot-toast";
import { DataContext } from "../../context/DataProvider";
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled("img")({
  //html element ko target krne ke double quote use krne hote hai and for styling use object
  width: 200,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb6418;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const SignUpButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const signupInitialValue = {
  name: "",
  username: "",
  password: "",
};
const loginInitialValue = {
  username: "",
  password: "",
};
const Login = () => {
  const [account, toggleAccount] = useState("login");
  const [signupData, setSignupData] = useState(signupInitialValue);
  const [loginData, setLoginData] = useState(loginInitialValue);
  const [error, setError] = useState("");
  const {setAccount}=useContext(DataContext)
  const onChangeInput = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const onValueChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const signupUser = async () => {
    const res = await signup(signupData);
    // if (res.data.success) {
    //   toggleAccount("login");
    // }
  };
  const loginUser=async()=>{
    const res=await login(loginData);
    console.log(res.data)
    if(res.data.success){
      sessionStorage.setItem('accessToken',`Bearer ${res.data.accessToken}`)
      sessionStorage.setItem('refreshToken',`Bearer ${res.data.refreshToken}`)
      setAccount({username:res.data.username,name:res.data.name})
    }
    
  }
  return (
    <Component>
      <Box>
        <Image src={bgImg} alt="login bg image" />
        {account == "login" ? (
          <Wrapper>
            <TextField
              id="filled-basic"
              label="Enter username"
              onChange={(e) => onValueChange(e)}
              name="username"
              variant="filled"
            />
            <TextField
              id="filled-basic"
              label="Enter password"
              onChange={(e) => onValueChange(e)}
              name="password"
              variant="filled"
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={loginUser}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignUpButton
              variant="text"
              onClick={() => toggleAccount("signup")}
            >
              Create an account
            </SignUpButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="filled-basic"
              label="Enter Name"
              onChange={(e) => onChangeInput(e)}
              name="name"
              variant="filled"
            />
            <TextField
              id="filled-basic"
              label="Enter username"
              onChange={(e) => onChangeInput(e)}
              name="username"
              variant="filled"
            />
            <TextField
              id="filled-basic"
              label="Enter password"
              onChange={(e) => onChangeInput(e)}
              name="password"
              variant="filled"
            />
            {error && <Error>{error}</Error>}
            <SignUpButton variant="text" onClick={signupUser}>
              Signup
            </SignUpButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton
              variant="contained"
              onClick={() => toggleAccount("login")}
            >
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
export default Login;
