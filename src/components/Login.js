import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username , SetUserName] = useState("")
  const [password , SetPassword] = useState("")
  const history = useHistory();

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  // let formData = {username , password}
  const login = async (formData) => {
    const Data = {username, password}
    try{
    const response = await axios.post(`${config.endpoint}/auth/login`, Data);
    if(response.status === 201){
      enqueueSnackbar("Logged in",{variant:"success"})
      let username = response.data.username
      let token = response.data.token
      let balance = response.data.balance
      
    
      // localStorage.setItem("username" , username)
      // localStorage.setItem("token" , token)
      // localStorage.setItem("balance" , balance)
      persistLogin(token , username , balance)
      history.push('/')
    

    }
  }
  catch(err){
    if(err.response.data.message === "Username does not exist")
    {
    enqueueSnackbar("Username does not exist",{variant:"error"})
    console.log(err.response.data)
    }

    else if(err.response.data.message === "Password is incorrect"){
    enqueueSnackbar("Password is incorrect",{variant:"error"})
    }
    else{
      enqueueSnackbar("Backend is not connected",{variant:"error"})
    }

  }
  

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
     
    if(username ===  ""){
      enqueueSnackbar("username required",{variant:"error"})
    }
    else if(password === "") {
      enqueueSnackbar("password required",{variant:"error"})
    }
    

    else{
      return login()
      
    }
    

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    
      localStorage.setItem("username" , username)
      localStorage.setItem("token" , token)
      localStorage.setItem("balance" , balance)


  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
        <h2 className="title">Login</h2>
          <TextField onChange={(e)=>SetUserName(e.target.value)}
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <TextField onChange={(e)=>SetPassword(e.target.value)}
            id="password"
            variant="outlined"
            label="Password"
            title="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter Password"
          />
          <Button className="button" variant="contained" onClick={validateInput}> LOGIN TO QKART </Button>
          <p className="secondary-action">
            Don't have an account?{" "}
             <a className="link" href="/register">
              Register now
             </a>
             </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
