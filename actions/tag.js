import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from "../actions/auth";


export function create(tag, token) {

    // 1. go to the backend, call tag api
    return fetch(`${API}/tag`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(tag)
        })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log("There is an error"));
};


export function getTags() {

    // 1. go to the backend, call tags api
    return fetch(`${API}/tags`,
        {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export function getTagsByField(topic) {

    // 1. go to the backend, call tags api
    return fetch(`${API}/tags/${topic}`,
        {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export function singleTag(slug) {

    // 1. go to the backend, call tag api
    return fetch(`${API}/tag/${slug}`,
        {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export function removeTag(slug, token) {

    // 1. go to the backend, call category api
    return fetch(`${API}/tag/${slug}`,
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
        .catch(err => console.log(err));
};


export function updateTag(name, topics, token, slug) {
    let endpoint = `${API}/tag/${slug}`;

    return fetch(`${endpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(name, topics)

    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};
