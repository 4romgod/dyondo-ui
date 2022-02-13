import React, { useEffect } from "react";
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

function Admin(props){

    useEffect(()=>{
        if(!isAuth()){
            Router.push(`/signin`);
        }
        else if(isAuth().role != 1 ){
            Router.replace(`/`);
        }
    }, []);

    return <React.Fragment>{props.children}</React.Fragment>
};

export default Admin;