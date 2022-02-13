import React, { useState, useEffect } from "react";
import Router from 'next/router';
import { preSignup, signup, isAuth } from "../../actions/auth";
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from "./GoogleLogin";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

function SignUpComponent() {
    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, surname, email, password, confirmPassword, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setValues((prevVal) => {
            return { ...prevVal, error: false, [name]: value };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        setValues({ ...values, loading: true, error: false });

        if (password === confirmPassword) {
            const user = { name, surname, email, password };
            preSignup(user).then(response => {
                console.dir(user, {depth:null})
                if (response.error) {
                    setValues({ ...values, error: response.error, loading: false, message: '' });
                    toast.dismiss();
                    toast.error(response.error);
                }
                else {
                    setValues({ ...values, name: '', surname: '', email: '', password: '', error: '', loading: false, message: response.message, showForm: false });
                    toast.dismiss();
                    toast.success(response.message);
                }
            });
        }
        else {
            toast.dismiss();
            toast.error("Passwords do not match");
            setValues({ ...values, error: "Passwords do not match" });
        }
    };

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={name}
                        name="name"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Type your name"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        value={surname}
                        name="surname"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Type your surname"
                        required
                    />
                </div>

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
                    <input
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        placeholder="Comfirm password"
                        required
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-success btn-lg" type="submit">Signup</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            <ToastContainer />

            <div className="animate__animated animate__fadeIn">
                <GoogleLogin btnText="Signup with Google" />
                {showForm && signupForm()}
            </div>
        </React.Fragment>
    )
}

export default SignUpComponent;