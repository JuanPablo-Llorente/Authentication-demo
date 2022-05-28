// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
// Files
import {getUsers, register} from "../../redux/actions/actions";
import styles from "./Register.module.css";


function Register()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        const foundUsername = users.filter(e => e.userName === input.userName);
        const foundEmail = users.filter(e => e.email === input.email);

        if(!input.name)
        {
            errors.name = <font color="red">*</font>;
        }
        else if(!input.lastName)
        {
            errors.lastName = <font color="red">*</font>;
        }
        else if(!input.userName)
        {
            errors.userName = <font color="red">*</font>;
        }
        else if(!input.email)
        {
            errors.email = <font color="red">*</font>;
        }
        else if(foundUsername.length)
        {
            errors.userName = <p className={styles.Alert}>This username isn't available. Please try another.</p>;
        }
        else if(foundEmail.length)
        {
            errors.email = <p className={styles.Alert}>This email is already in use available. Please try another.</p>;
        }
        else if(!input.password)
        {
            errors.password = <font color="red">*</font>;
        };
        
        return errors;
    };
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input, [e.target.name] : e.target.value}));
        // console.log(input);
    };
    
    function handleSubmit(e)
    {
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            alert("All fields are required.");
        }
        else
        {
            e.preventDefault();
            dispatch(register(input));
            setInput({
                name: "",
                lastName: "",
                userName: "",
                email: "",
                password: "",
            });
            alert("The user was successfully created!");
            navigate("/login");
        };
    };
    
    
    return(
        <div className={styles.Container}>
            <form onSubmit={e => handleSubmit(e)}>
                <input onChange={e => handleChange(e)} type="text" placeholder="Name" name="name"/>
                {
                    errors.name && errors.name
                }
                <input onChange={e => handleChange(e)} type="text" placeholder="Last name" name="lastName"/>
                {
                    errors.lastName && errors.lastName
                }
                <input onChange={e => handleChange(e)} type="text" placeholder="Username" name="userName"/>
                {
                    errors.userName && errors.userName
                }
                <input onChange={e => handleChange(e)} type="email" placeholder="Email" name="email"/>
                {
                    errors.email && errors.email
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


export default Register;