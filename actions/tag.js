import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from "../actions/auth";

export function create(tag, token) {
    return fetch(`${API}/tag`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`

        },
        body: JSON.stringify(tag)
    }).then(response => {
        handleResponse(response);
        return response.json();
    }).catch(err => console.log(`ERROR: could not create the tag: ${tag}`));
};

export function getTags() {
    return fetch(`${API}/tags`, {
        method: 'GET',
    }).then(response => {
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};

export function getTagsByField(topic) {
    return fetch(`${API}/tags/${topic}`, {
        method: 'GET',
    }).then(response => {
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};

export function singleTag(slug) {
    return fetch(`${API}/tag/${slug}`, {
        method: 'GET',
    }).then(response => {
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};

export function removeTag(slug, token) {
    return fetch(`${API}/tag/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        handleResponse(response);
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};

export function updateTag(name, topics, token, slug) {
    return fetch(`${API}/tag/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(name, topics)
    }).then(response => {
        handleResponse(response);
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};