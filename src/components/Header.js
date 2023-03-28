import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Avatar, Button, Stack,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import "./Header.css";

const Header = (props) =>

  {
    const history = useHistory();
    const logout = () => {
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      localStorage.removeItem("balance")
      history.push("/")
      window.location.reload()
    }

    const username = localStorage.getItem("username")
    let logoutbutton; 
    function loginHandler(){
      history.push("/login")

    }
    function registerHandler(){
      history.push("/register")
    }
    function homePageHandler(){
      history.push("/")
    }
    let searchbox;
    let headerButton;

    if (props.hasHiddenAuthButtons){
      headerButton = <Button onClick={homePageHandler}
        name="back to explore"
        startIcon={<ArrowBackIcon />}
        variant="text"
        >
        Back to explore
      </Button>
    }
    else if (username){
      searchbox = <TextField onChange={props.fun}
      className="search-desktop"
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search color="primary" />
          </InputAdornment>
        ),
      }}
      placeholder="Search for items/categories"
      name="search"
    />
      logoutbutton = <img src="logo_light.svg" alt="QKart-icon"></img>
      headerButton = <Stack direction="row" spacing={1} alignItems="center">
        <Avatar alt={username} src="avatar.png" />
        <p>{username}</p>
        <Button onClick={logout} variant="text">LOGOUT</Button>
      </Stack>
    }
     
   
    else {
      searchbox = <TextField onChange={props.fun}
      className="search-desktop"
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search color="primary" />
          </InputAdornment>
        ),
      }}
      placeholder="Search for items/categories"
      name="search"
    />
      logoutbutton = <img src="logo_dark.svg" alt="QKart-icon" onClick={loginHandler}></img>
      headerButton = <Stack direction="row" spacing={1} alignItems="center">
        <Button onClick={loginHandler}  variant="text">LOGIN</Button>
        <Button onClick={registerHandler} variant="contained">REGISTER</Button>
      </Stack>
    }
    if(props.isReadOnly === false){
      searchbox = ""
      logoutbutton  = <img src ="logo_light.svg" alt="QKart-icon" onClick={()=>{history.push("/")}}></img>

    }
   

    return (
      <Box className="header">
        <Box
          className="header-title"
        >
          {logoutbutton}
        </Box>
        {searchbox}
        {headerButton}
      </Box>
    );
  };

export default Header;
