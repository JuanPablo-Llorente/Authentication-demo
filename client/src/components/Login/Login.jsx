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
        userName: "",
        password: "",
    });
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.userName)
        {
            errors.userName = <font color="red">*</font>;
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
    
    function handleShowPassword(e)
    {
        
    }
    
    function handleSubmit(e)
    {
        const foundUsername = users.filter(e => e.userName === input.userName);
        const foundEmail = users.filter(e => e.email === input.userName);

        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            alert("All fields are required.");
        }
        else
        {
            if(foundUsername.length || foundEmail.length)
            {
                const foundPassword = 
                
                e.preventDefault();
                dispatch(login(input));
                setInput({
                    userName: "",
                    password: "",
                });
                navigate("/login");
            }
        };
    };
    
    return(
        <div className={styles.Container}>
            <form onSubmit={e => handleSubmit(e)}>
                <input onChange={e => handleChange(e)} type="text" placeholder="Username or email" name="userName"/>
                {
                    errors.userName && errors.userName
                }
                <input onChange={e => handleChange(e)} type="password" placeholder="Password" name="password"/>
                {
                    errors.password && errors.password
                }
                <button className={styles.SubmitButton} type="submit">Register</button>
            </form>
        </div>
    );
};


export default Login;