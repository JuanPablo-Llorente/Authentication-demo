// Dependencies
import axios from "axios";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
// Files
import {profile} from "../../redux/actions/actions";
import styles from "./Profile.module.css";

const URL = "http://localhost:3000/profile";

function Profile()
{
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const loggedUser = window.localStorage.getItem("userData");
    const navigate = useNavigate();
    // console.log(loggedUser);
    useEffect(() => dispatch(profile(loggedUser)), [dispatch]);
    
    

    function handleLogout(e)
    {
        e.preventDefault();
        window.localStorage.clear();
        navigate("/login");
    };
    
    if(loggedUser)
    {
        return(
            <div className={styles.Container}>
                <h1>Profile</h1>
                <button className={styles.Logout} onClick={handleLogout} >Logout</button>
            </div>
        );
    }
    else
    {
        return(<Navigate to="/login"/>);
    };
};


export default Profile;