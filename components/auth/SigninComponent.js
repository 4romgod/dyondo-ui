import { useState, useEffect } from "react";
import Router from 'next/router';

import { signin, authenticate, isAuth } from "../../actions/auth";
import Link from "next/link";

import LoginGoogle from "./GoogleLogin";

const remPad = { padding: "0", border: "0" };


function SigninComponent() {
    const [values, setValues] = useState({
        email: 'email@gmail.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    // when we are signed in, useEffect redirects us to home page
    useEffect( ()=> {
        isAuth() && Router.push(`/`);
    }, []);


    // handles a change in the state of the input fields
    function handleChange(event) {
        const { name, value } = event.target;

        console.log(event.target.value);

        setValues((prevVal) => {
            return { ...prevVal, error: false, [name]: value };
        });

    }

    // handles submission of a signin request
    function handleSubmit(event) {
        event.preventDefault();
        //console.table({ name, email, password, error, loading, message, showForm });

        // 2. Save the state of these user details.
        setValues({ ...values, loading: true, error: false });

        // 3. Create a user object.
        const user = { email, password };

        // 4. Call signin from actions/auth go make reques to the server
        signin(user).then(data => {
            if (data.error) {       //server sends us an error
                setValues({ ...values, error: data.error, loading: false });
                console.log(values);
            } else {
                // 1. save user token to cookie
                // 2. save user info to local storage
                // 3. authenticate user
                authenticate(data, () => {
                    if( isAuth() && (isAuth().role===1) ){
                        Router.push(`/admin`);
                    }
                    else{
                        Router.push(`/user`);
                    }
                });
            }
        });

    };


    function showLoading(){
        return (
            loading ? 
            <div style={remPad} className="alert alert-info"><p style={{padding: "20px"}}>Loading...</p></div> :
            "");
    }

    function showError(){
        return (
        <div className="alert alert-danger" style={{display: error? '' : 'none'}}>
            {error}
        </div>)
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: message ? '' : 'none' }}>
                {message}
            </div>);
    };


    const signinForm = () => {
        return (<form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    value={email}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    placeholder="Type your email"
                />
            </div>

            <div className="form-group">
                <input
                    value={password}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Type your password"
                />
            </div>
            <div className="form-group">
                <button className="btn btn-success btn-lg" type="submit">Signin</button>
            </div>

        </form>
        )
    }

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showSuccess()}
            <LoginGoogle />
            {showForm && signinForm()}
            <br />
            <Link href="/auth/password/forgot">
                <a className="btn btn-outline-danger btn-sm">
                    Reset Password
                </a>
            </Link>
        </React.Fragment>
    )
}

export default SigninComponent;