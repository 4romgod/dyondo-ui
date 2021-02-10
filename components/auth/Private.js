import { useEffect } from "react";
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

function Private(props){

    useEffect(()=>{
        if(!isAuth()){
            Router.push(`/signin`);
        }
    }, []);

    return <React.Fragment>{props.children}</React.Fragment>
};

export default Private;