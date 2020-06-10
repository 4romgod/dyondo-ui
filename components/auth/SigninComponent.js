import { useState, useEffect } from "react";
import Router from 'next/router';
import Link from "next/link";

import { signin, authenticate, isAuth } from "../../actions/auth";
import LoginGoogle from "./GoogleLogin";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const remPad = { padding: "0", border: "0" };

function SigninComponent() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, [message, error, loading]);


    function handleChange(event) {
        const { name, value } = event.target;

        console.log(event.target.value);

        setValues((prevVal) => {
            return { ...prevVal, error: false, [name]: value };
        });

    }

    function handleSubmit(event) {
        event.preventDefault();

        setValues({ ...values, loading: true, error: false });

        const user = { email, password };

        signin(user).then(data => {
            if (data.error) {       //server sends us an error
                setValues({ ...values, error: data.error, loading: false });
                console.log(values);
            }
            else {
                authenticate(data, () => {
                    if (isAuth() && (isAuth().role === 1)) {
                        Router.push(`/admin`);
                    }
                    else {
                        Router.push(`/user`);
                    }
                });
            }
        });

    };

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                {message && toast.success(message)}
                {error && toast.error(error)}

                <div className="form-group">
                    <input
                        value={email}
                        name="email"
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        placeholder="Type your email"
                        required
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
                        required
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-success btn-lg" type="submit">Signin</button>
                </div>

            </form>)
    }

    return (
        <React.Fragment>
            <ToastContainer />

            {/* <LoginGoogle /> */}

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