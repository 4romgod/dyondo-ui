import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';


// TO GET A USER PUBLIC PROFILE
export function userPublicProfile(username) {
    return fetch(`${API}/user/${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// TO GET A USER PRIVATE PROFILE BY TOKEN
export function getProfile(token) {
    return fetch(`${API}/user/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


// TO UPDATE A USER PRIVATE PROFILE
export function updateProfile(token, user) {
    return fetch(`${API}/user/update`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};
