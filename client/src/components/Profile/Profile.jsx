// Dependencies
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
// Files


function Profile()
{
    const loggedUser = window.localStorage.getItem("token");
    const navigate = useNavigate();
    
    // console.log(loggedUser);
    

    function handleRedirect()
    {
        navigate("/login");
    };
    
    if(loggedUser)
    {
        return(
            <div>
                Profile
            </div>
        );
    }
    else
    {
        return(
            <div>
                <h2>You must log in.</h2>
                <button onClick={e => handleRedirect(e)} >Login</button>
            </div>
        );
    };
};


export default Profile;