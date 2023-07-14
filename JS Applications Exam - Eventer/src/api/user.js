import { get, post } from './api.js'
import { clearUserData, setUserData } from '../util.js';

const endpoints = {
    'login' : '/users/login',
    'register' : '/users/register',
    'logout' : '/users/logout'
}

export async function login(email, password) {
    const {_id, email: resultEmail, accessToken} = await post(endpoints.login, { email, password });

    setUserData({
        _id, 
        email: resultEmail,
        accessToken
    });
}

export async function register(email, password) {
    const {_id, email: resultEmail, accessToken} = await post(endpoints.register, { email, password });

    setUserData({
        _id, 
        email: resultEmail,
        accessToken
    });
}

export async function logout() {
    get(endpoints.logout);
    clearUserData();
}