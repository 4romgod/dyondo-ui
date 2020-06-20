import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from "../actions/auth";

export function getSitemap(slug, token) {

    // 1. go to the backend, call category api
    return fetch(`${API}/sitemap`,
        {
            method: 'GET'  
        })
        .then(response => {
            return response;
        })
        .catch(err => console.log(err));
};