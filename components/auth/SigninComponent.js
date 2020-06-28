import { useState, useEffect } from "react";
import Router from 'next/router';
import Link from "next/link";

import { signin, authenticate, isAuth } from "../../actions/auth";

import GoogleLogin from "./GoogleLogin";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const remPad = { padding: "0", border: "0" };

toast.configure();
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

        //console.log(event.target.value);

        setValues((prevVal) => {
            return { ...prevVal, error: false, [name]: value };
        });

    }

    function handleSubmit(event) {
        event.preventDefault();

        setValues({ ...values, loading: true, error: false, message: '' });

        const user = { email, password };

        signin(user)
            .then(data => {
                if (data.error) {       //server sends us an error
                    setValues({ ...values, error: data.error, loading: false, message: '' });

                    toast.dismiss();
                    toast.error(data.error);
                }
                else {
                    authenticate(data, () => {
                        if (isAuth() && (isAuth().role === 1)) {
                            toast.dismiss();
                            toast.success("Successfully signed in");

                            Router.push(`/admin`);
                        }
                        else {
                            toast.dismiss();
                            toast.success("Successfully signed in");

                            Router.push(`/user`);
                        }
                    });
                }
            });

    };

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>

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

            <div className="animate__animated animate__fadeIn">
                <GoogleLogin btnText="Signin with Google" />

                {showForm && signinForm()}

                <br />

                <Link href="/auth/password/forgot">
                    <a className="btn btn-outline-danger btn-sm">
                        Reset Password
                </a>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default SigninComponent;