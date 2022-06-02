// Dependencies
import axios from "axios";
// Files
const URL = "http://localhost:3000";


export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const PROFILE = "PROFILE";
export const GET_USERS = "GET_USERS";



export function register(values)
{
    return async function(dispatch)
    {
        const data = (await axios.post(`${URL}/register`, values)).data;
        return dispatch({type: REGISTER, payload: data});
    };
};

export function login(values)
{
    return async function(dispatch)
    {
        const data = (await axios.post(`${URL}/login`, values)).data;
        return dispatch({type: LOGIN, payload: data});
    };
};

export function profile(userData)
{
    return async function(dispatch)
    {
        const userDataJson = JSON.parse(userData);
        const token = userDataJson.token;
        const config =
        {
            headers:
            {
                authorization: `Bearer ${token}`,
            },
        };
        const data = (await axios(`${URL}/profile`, config)).data;
        return dispatch({type: PROFILE, payload: data});
    };
};

export function getUsers()
{
    return async function(dispatch)
    {
        const data = (await axios(`${URL}/users`)).data;
        return dispatch({type: GET_USERS, payload: data});
    };
};