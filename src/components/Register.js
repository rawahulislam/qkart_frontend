import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar("");
  const [username , setUserName] = useState("")
  const [password , setPassword] = useState("")
  const [confirmPassword , setConfirmPassword] = useState("")
  const history = useHistory();



  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
const register = async () => {

    
  
    try {
    const article = {username, password}
    const response = await axios.post(`${config.endpoint}/auth/register`, article);
    enqueueSnackbar("Register successfully",  {variant: "success"})
    history.push('/login')
     
    }
    catch (err){

      
    if(err.response.status === 400 && err.response) {
       return enqueueSnackbar(err.response.data.message, {variant: "error"})
      
      }

    else
      {
         enqueueSnackbar("Username is already taken", {variant: "error"})
         console.log("backend failed")
      }
     
   
    }
  
  
  
};
  


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = () => {
     
    const val = {username, password, confirmPassword}

    

    if (val.username === ""){
      enqueueSnackbar("Username is a required field", { 
        variant: 'error',
    })
  
    }
    else if (val.password === ""){
       return enqueueSnackbar("Password is a required field", { 
        variant: 'error',
    })
     
    }

    else if (val.username.length < 6){
      return enqueueSnackbar("Username must be at least 6 characters", { 
        variant: 'error',
    })
      
    }
    else if (val.password.length < 6){
       return enqueueSnackbar("Password must be at least 6 characters", { 
        variant: 'error',
    })
      
    }
    else if (val.password !== val.confirmPassword){
      return enqueueSnackbar("Passwords do not match", { 
        variant: 'error',
    })
      
    }
    else
    {
      return register()
       
    }  
    
};





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
          <h2 className="title">Register</h2>
          <TextField
           onChange={e=>setUserName(e.target.value)}
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
          onChange={e=>setPassword(e.target.value)}
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
          onChange={e=>setConfirmPassword(e.target.value)}
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
          />
           <Button className="button" variant="contained" onClick={validateInput}>
            Register Now
           </Button>
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="/login">
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
