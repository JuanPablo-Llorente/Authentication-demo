// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
// Files
import {getUsers, login} from "../../redux/actions/actions";
import styles from "./Login.module.css";


function Login()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        user: "",
        password: "",
    });
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.user)
        {
            errors.user = <font color="red">*</font>;
        }
        else if(!input.password)
        {
            errors.password = <font color="red">*</font>;
        };
        
        return errors;
    };
    
    function handleChange(e)
    {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
        // console.log(input);
    };
    
    // function handleShowPassword(e)
    // {
        
    // }
    
    function handleSubmit(e)
    {
        const foundUsername = users.filter(e => e.userName === input.user);
        const foundEmail = users.filter(e => e.email === input.user);

        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            alert("All fields are required.");
        }
        else
        {
            if(foundUsername.length || foundEmail.length)
            {
                // e.preventDefault();
                dispatch(login(input));
                setInput({
                    user: "",
                    password: "",
                });
                console.log(input);
                navigate("/profile");
            }
            else
            {
                e.preventDefault();
                alert("Incorrect user or password.");
            };
        };
    };
    
    return(
        <div className={styles.Container}>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <input onChange={e => handleChange(e)} type="text" placeholder="Username or email" name="user"/>
                    {
                        errors.user && errors.user
                    }
                </div>
                <div>
                    <input onChange={e => handleChange(e)} type="password" placeholder="Password" name="password"/>
                    {
                        errors.password && errors.password
                    }
                </div>
                <button className={styles.SubmitButton} type="submit">Login</button>
            </form>
        </div>
    );
};


export default Login;