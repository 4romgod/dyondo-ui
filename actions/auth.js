import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from "js-cookie";
import Router from 'next/router';


export const handleResponse = (response) => {
    if (response.status === 401) {    //unauthorized
        console.log("Time expired bitch");
        
        signout(() => {
            Router.replace({
                pathname: "/signin",
                query: {
                    message: "Your session is expired. Please signin"
                }
            });
        });
    }
    else{
        return;
    }
}

export const preSignup = (user) => {

    // 1. go to the backend, call signup api
    return fetch(`${API}/pre-signup`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)      // 3. pass the new user in the body
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log("ERROR: " + err));
};


export const signup = (user) => {

    // 1. go to the backend, call signup api
    return fetch(`${API}/signup`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)      // 3. pass the new user in the body
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log("ERROR: " + err));
};


export const signin = (user) => {

    // 1. go to the backend, call signin api
    return fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const signout = (next) => {

    // 1. remove cookie and local storage
    removeCookie('token');
    removeLocalStorage('user');
    next();

    // 2. request to backend to signin
    // 2.1. redirect the user
    return fetch(`${API}/signout`, {
        method: "GET"
    })
        .then(response => {
            console.log("signout sucess!");
        })
        .catch(err => console.log(err));

}


export const setCookie = (key, value) => {
    if (process.browser) {
        Cookies.set(key, value, { expires: 1 });
    }
};


export const removeCookie = (key) => {
    if (process.browser) {
        Cookies.remove(key, { expires: 1 });
    }
};


export const getCookie = (key) => {
    if (process.browser) {
        return Cookies.get(key);
    }
};


export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};


export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};


export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);

    next();
};


export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');

        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            }
            else {
                return false;
            }
        }
    }
};


export function updateUser(user, next) {
    if (process.browser) {
        if (localStorage.getItem('user')) {
            let auth = JSON.parse(localStorage.getItem('user'));

            auth = user;

            localStorage.setItem('user', JSON.stringify(auth));
            next();
        }
    }
}


export const forgotPassword = (email) => {

    return fetch(`${API}/forgot-password`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const resetPassword = (resetInfo) => {
    return fetch(`${API}/reset-password`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resetInfo)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const loginWithGoogle = (user) => {
    return fetch(`${API}/google-login`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};