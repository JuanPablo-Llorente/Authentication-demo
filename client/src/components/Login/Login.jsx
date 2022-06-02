// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";
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
    const [/*user*/, setUser] = useState(null);
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
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input,[e.target.name] : e.target.value}));
        // console.log(input);
    };
    
    // function handleShowPassword(e)
    // {
        
    // }
    
    async function handleSubmit(e)
    {
        const foundUsername = users.filter(e => e.userName === input.user);
        const foundEmail = users.filter(e => e.email === input.user);
        
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("All fields are required.");
        }
        else
        {
            if((foundUsername.length || foundEmail.length))
            {
                e.preventDefault();
                const data = await dispatch(login(input)).catch(error => console.log(error));
                
                if(data === undefined || data === null)
                {
                    swal("Incorrect user or password.");
                }
                else
                {
                    const payload = data.payload;
                    const userData =
                    {
                        id: payload.foundUser[0].id,
                        userName: payload.foundUser[0].userName,
                        token: payload.token,
                    };
                    
                    window.localStorage.setItem("userData", JSON.stringify(userData));
                    
                    // No se aplica porque esta dentro de una async function
                    setInput({
                        user: "",
                        password: "",
                    });
                    
                    setUser(userData);
                    // ------------------------------------------------------
                    swal("Loged.");
                    navigate("/profile");
                };
            }
            else
            {
                e.preventDefault();
                swal("Incorrect user or password.");
            };
        };
    };
    
    return(
        <div className={styles.Container}>
            <form onSubmit={handleSubmit} className={styles.Form}>
                <div>
                    <input onChange={handleChange} type="text" placeholder="Username or email" name="user"/>
                    {
                        errors.user && errors.user
                    }
                </div>
                <div>
                    <input onChange={handleChange} type="password" placeholder="Password" name="password"/>
                    {
                        errors.password && errors.password
                    }
                </div>
                <button className={styles.SubmitButton} type="submit">Login</button>
                
                <Link to="/reset"><p>Forgot password?</p></Link>
                
                <p>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};


export default Login;