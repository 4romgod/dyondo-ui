import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from "../actions/auth";

export function create(category, token) {
    return fetch(`${API}/category`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },               
            body: JSON.stringify(category)      
        })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log("ERROR: " + err));
};

export function getCategories() {
    return fetch(`${API}/categories`,
        {
            method: 'GET',     
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log("ERROR: " + err));
};

export function singleCategory(slug) {
    return fetch(`${API}/category/${slug}`,
        {
            method: 'GET',     
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log("ERROR: " + err));
};

export function removeCategory(slug, token) {
    return fetch(`${API}/category/${slug}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }     
        })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log("ERROR: " + err));
};