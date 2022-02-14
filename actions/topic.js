import fetch from 'isomorphic-fetch';
import { API } from '../config';
import {handleResponse} from "../actions/auth";


export function create(topic, token) {
    return fetch(`${API}/topics`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                //Authorization: `Bearer ${token}`
            },               
            body: JSON.stringify(topic)      
        })
        .then(response => {
            //handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export function list() {
    return fetch(`${API}/topics`,
        {
            method: 'GET',     
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export function singleTopic(slug) {
    return fetch(`${API}/topic/${slug}`,
        {
            method: 'GET',     
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export function removeTopic(slug, token) {
    return fetch(`${API}/topic/${slug}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${token}`
            }     
        })
        .then(response => {
            //handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};