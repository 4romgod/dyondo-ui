import { useEffect } from "react";
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

function Admin(props){

    useEffect(()=>{
        if(!isAuth() ){      //if we dont have auth user in local storage
            Router.push(`/signin`);
        }
        else if(isAuth().role != 1 ){
            Router.push(`/`);
        }

    }, []);


    //else if we have auth user in local storage
    return <React.Fragment>{props.children}</React.Fragment>

};

export default Admin;