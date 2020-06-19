import fetch from 'isomorphic-fetch';
import { API } from '../config';

export function sendMessage(message) {
    let emailEndpoint;

    if(message.authorEmail){
        emailEndpoint = `${API}/contact-blog-author`;
    }
    else{
        emailEndpoint = `${API}/contact`;
    }

    return fetch(`${emailEndpoint}`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },               
            body: JSON.stringify(message)      
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export function sendNodemailer(message) {
    let emailEndpoint = '';

    if(message.authorEmail){
        emailEndpoint = `${API}/contact-blog-author`;
    }
    else{
        emailEndpoint = `${API}/contact`;
    }
    
    return fetch(`${emailEndpoint}`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },               
            body: JSON.stringify(message)      
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export function newsletter(userData){
    return fetch(`${API}/newsletter`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));

}