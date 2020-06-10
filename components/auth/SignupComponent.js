import { useState, useEffect } from "react";
import Router from 'next/router';

import { preSignup, signup, isAuth } from "../../actions/auth";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function SignUpComponent() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, password, confirmPassword, error, loading, message, showForm } = values;

    // when we are signed in, useEffect redirects us to home page
    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);


    // handles a change in the state of the input fields
    function handleChange(event) {
        const { name, value } = event.target;

        setValues((prevVal) => {
            return { ...prevVal, error: false, [name]: value };
        });
    }

    // handles submission of a signup request
    function handleSubmit(event) {
        event.preventDefault();
        //console.table({ name, email, password, error, loading, message, showForm });

        // 2. Set the state of our user details
        setValues({ ...values, loading: true, error: false });

        // 3. Create a new user object
        if (password === confirmPassword) {
            const user = { name, email, password };

            // 3.1. Call signup from actions/auth go make request to the server
            preSignup(user).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    setValues({
                        ...values,
                        name: '', email: '', password: '',
                        error: '', loading: false,
                        message: data.message, showForm: false
                    });
                }
            });
        }
        else {
            setValues({ ...values, error: "Passwords do not match" });
        }

    };

    const signupForm = () => {
        return (<form onSubmit={handleSubmit}>

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
            {message && toast.success(message)}
            {error && toast.error(error)}

            {showForm && signupForm()}
        </React.Fragment>
    )
}

export default SignUpComponent;