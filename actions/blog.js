import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { isAuth, handleResponse } from './auth';

import queryString from 'querystring';


// TO CREATE A BLOG
export function createBlog(blog, token) {
    let endpoint;

    if (isAuth() && isAuth().role === 1) {
        endpoint = `${API}/blog`;
    }
    else if (isAuth() && isAuth().role === 0) {
        endpoint = `${API}/user/blog`;
    }

    return fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


// TO GET A SINGLE BLOG
export function singleBlog(slug) {
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


// TO GET A LIST OF THE BLOGS, CATEGORIES, AND TAGS
export function listBlogCatTag(skip, limit) {
    const data = { limit, skip }

    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// TO GET A LIST OF ALL THE BLOGS
export function list(username) {
    let endpoint;

    if (username) {
        endpoint = `${API}/${username}/blogs`;
    }
    else {
        endpoint = `${API}/blogs`;
    }


    return fetch(`${endpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}


// TO GET A LIST OF RELATED BLOGS
export function listRelated(blog) {
    //console.log(blog);

    return fetch(`${API}/blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// TO DELETE A BLOG BY A USER WITH A TOKEN
export function removeBlog(slug, token) {
    let endpoint;

    if (isAuth() && isAuth().role === 1) {
        endpoint = `${API}/blog/${slug}`;
    }
    else if (isAuth() && isAuth().role === 0) {
        endpoint = `${API}/user/blog/${slug}`;
    }

    return fetch(`${endpoint}`, {
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


// TO UPDATE A BLOG BY A USER WITH A TOKEN
export function updateBlog(blog, token, slug) {
    let endpoint;

    if (isAuth() && isAuth().role === 1) {
        endpoint = `${API}/blog/${slug}`;
    }
    else if (isAuth() && isAuth().role === 0) {
        endpoint = `${API}/user/blog/${slug}`;
    }

    return fetch(`${endpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};




// TO GET A LIST OF ALL THE BLOGS BY WAY OF SEARCH
export function listSearch(params) {
    console.log('search params: ' + params);
    let query = queryString.stringify(params);
    console.log('query params: ' + query);

    return fetch(`${API}/blogs/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}