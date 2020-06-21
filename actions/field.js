import fetch from 'isomorphic-fetch';
import { API } from '../config';
import {handleResponse} from "../actions/auth";


export function create(field, token) {
    return fetch(`${API}/field`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${token}`
            },               
            body: JSON.stringify(field)      
        })
        .then(response => {
            //handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export function getFields() {
    return fetch(`${API}/fields`,
        {
            method: 'GET',     
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export function singleField(slug) {
    return fetch(`${API}/field/${slug}`,
        {
            method: 'GET',     
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export function removeFieldy(slug, token) {
    return fetch(`${API}/field/${slug}`,
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