import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, updateProfile } from "../../actions/user";
import { API } from "../../config";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import FullPageLoader from "../Loader/FullPageLoader";


function ProfileUpdate() {
    const [values, setValues] = useState({
        username: '',
        username_for_photo: '',
        name: '',
        email: '',
        about: '',
        password: '',
        photo: '',
        photoName: '',
        userData: process.browser && new FormData(),
    });

    const [results, setResults] = useState({
        error: false,
        success: false,
        loading: false,
        btnDisable: false
    });

    const { username, username_for_photo, name, email, about, password, photo, photoName, userData } = values;
    const { error, success, loading, btnDisable } = results;
    const token = getCookie("token");

    function initUser() {
        setValues({ ...values, loading: true });

        getProfile(token).then(data => {
            if (data.error) {
                setResults({ ...results, error: data.error, loading: false });
            }
            else {
                setResults({ ...results, loading: false, error: false });
                setValues({ ...values, username: data.username, username_for_photo: data.username, name: data.name, email: data.email, about: data.about });
            }
        });
    }

    useEffect(() => {
        initUser();
        setValues({ ...values, userData: new FormData() });
    }, []);


    function handleChange(name) {
        return (event) => {
            let value;

            if (name === 'photo') {
                value = event.target.files[0];
                const fileSize = value ? value.size / 1024 / 1024 : 0;

                if (fileSize > 1) {
                    toast.dismiss();
                    toast.error("Image size should be less than 1MB");
                }
                else {
                    userData.set(name, value);

                    setResults({ ...results, error: false, success: false });
                    setValues({ ...values, photoName: value ? value.name : '', [name]: value, userData });
                }
            }
            else {
                if ((name === 'username') || (name === 'name')) {
                    value = event.target.value;
                    const textSize = value ? value.length : 0;

                    if (textSize > 32) {
                        setResults({ ...results, error: `${name} should be less than 32 characters` })
                    }
                    else {
                        userData.set(name, value);

                        setResults({ ...results, error: false, success: false });
                        setValues({ ...values, [name]: value, userData });
                        console.log(username_for_photo);
                        console.log(username);
                    }

                }
                else if (name === 'about') {
                    value = event.target.value;
                    userData.set(name, value);

                    setResults({ ...results, error: false, success: false });
                    setValues({ ...values, [name]: value, userData });
                }
                else if (name === 'password') {
                    value = event.target.value;
                    userData.set(name, value);
                    setValues({ ...values, [name]: value });
                }
            }

        }
    }


    function handleSubmit(event) {
        event.preventDefault();

        setValues({ ...values, loading: true });

        updateProfile(token, userData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, loading: false });
            }
            else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        password: ''
                    });

                    setResults({ ...results, success: true, loading: false, btnDisable: true })
                });

                if (isAuth().role === 0) {
                    Router.replace(`/user`);
                }
                else if (isAuth().role === 1) {
                    Router.replace(`/admin`);
                }
            }

        });
    }


    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <small className="text-muted">Max size: 1MB</small><br />
                <label className="btn btn-outline-info">
                    Profile photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
                <small className="text-muted ml-2">{photoName}</small><br />
            </div>

            <div className="form-group">
                <label className="text-muted">Username</label>
                <input onChange={handleChange('username')} type="text" value={username} className="form-control" required maxLength="32" />
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" required maxLength="32" />
            </div>

            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Password (Leave blank to ignore)</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>

            <div>
                <button type="submit" className="btn btn-success btn-lg" disabled={loading}>
                    Update
                </button>
            </div>

        </form>
    );

    return (
        <React.Fragment>
            <ToastContainer />
            <div>
                {toast.dismiss()}
                {error && toast.error(error)}
                {loading && <FullPageLoader />}
            </div>

            <div className="container-fluid animate__animated animate__fadeIn">
                <div className="row">
                    <div className="col-md-4">
                        {username_for_photo &&
                            <img
                                src={`${API}/user/photo/${username_for_photo}`}
                                className="img img-fluid img-thumbnail mb-3"
                                style={{ maxWidth: '100%', maxHeight: "auto" }}
                                alt="user profile"
                            />
                        }
                    </div>
                    <div className="col-md-8 mb-5">{profileUpdateForm()}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProfileUpdate;