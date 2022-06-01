// Dependencies
import React from "react";
import {Navigate} from "react-router-dom";
// Files


function Profile()
{
    const loggedUser = window.localStorage.getItem("token");
    
    if(loggedUser)
    {
        return(<h1>Profile</h1>);
    }
    else
    {
        return(<Navigate to="/login"/>);
    };
};


export default Profile;