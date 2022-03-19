import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { isAuth, handleResponse } from './auth';
import queryString from 'querystring';

const createBlog = (blog, token) => {
    let endpoint;
    if (isAuth() && isAuth().role === 1) {
        endpoint = `${API}/blogs`;
    }
    else if (isAuth() && isAuth().role === 0) {
        endpoint = `${API}/user/blogs`;
    }

    return fetch(`${endpoint}`,
        {
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

const singleBlog = (slug) => {
    return fetch(`${API}/blogs/${slug}`, {
        method: 'GET'
    }).then(response => {
        console.log(response)
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
}

const listBlogsAndTags = (skip, limit) => {
    const data = { limit, skip }
    return fetch(`${API}/blogs-and-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};

const list = (username) => {
    let endpoint;
    if (username) {
        endpoint = `${API}/${username}/blogs`;
    } else {
        endpoint = `${API}/blogs`;
    }

    return fetch(`${endpoint}`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
}

const listRelated = (blog) => {
    return fetch(`${API}/blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    }).then(response => {
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};

const removeBlog = (slug, token) => {
    let endpoint;
    if (isAuth() && isAuth().role === 1) {
        endpoint = `${API}/blogs/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        endpoint = `${API}/user/blogs/${slug}`;
    }

    return fetch(`${endpoint}`, {
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

const updateBlog = (blog, token, slug) => {
    let endpoint;
    if (isAuth() && isAuth().role === 1) {
        endpoint = `${API}/blogs/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        endpoint = `${API}/user/blogs/${slug}`;
    }

    return fetch(`${endpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    }).then(response => {
        handleResponse(response);
        return response.json();
    }).catch(err => console.log("ERROR: " + err));
};

const listSearch = (params) => {
    let query = queryString.stringify(params);
    return fetch(`${API}/blogs/search?${query}`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}

export {
    createBlog,
    singleBlog,
    listBlogsAndTags,
    list,
    listRelated,
    removeBlog,
    updateBlog,
    listSearch
}