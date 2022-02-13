import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

export function userPublicProfile(username) {
    return fetch(`${API}/user/${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    }).then(response => {
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};

export function getProfile(token) {
    return fetch(`${API}/user/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        handleResponse(response);
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};

export function updateProfile(token, user) {
    return fetch(`${API}/user/update`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    }).then(response => {
        handleResponse(response);
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};