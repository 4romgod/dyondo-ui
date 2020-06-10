import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, updateProfile } from "../../actions/user";
import { API } from "../../config";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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

        error: false,
        success: false,
        loading: false,
        btnDisable: false
    });

    const { username, username_for_photo, name, email, about, password, photo, photoName, userData, error, success, loading, btnDisable } = values;
    const token = getCookie("token");

    function initUser() {
        getProfile(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            }
            else {
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
            if(name === 'photo'){
                value = event.target.files[0];
                setValues({ ...values, photoName: value?value.name:'' ,[name]: value, userData, error: false, success: false });
            }
            else{
                value = event.target.value;
                setValues({ ...values, [name]: value, userData, error: false, success: false });
            }

            userData.set(name, value);
        }
    }


    function handleSubmit(event) {
        event.preventDefault();

        setValues({ ...values, loading: true });

        updateProfile(token, userData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, loading: false });
                toast.error(error); 
            }
            else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        password: '',
                        success: true,
                        loading: false,
                        btnDisable: true
                    });
                });

                setTimeout(() => { 
                    Router.push(`/profile/${username}`);
                }, 2000);
            }


        });
    }


    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div>
                {success && toast.success('Profile updated!')}
                {error && toast.error(error)}
                {loading && toast.info("Loading...")}
            </div>

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
                <input onChange={handleChange('username')} type="text" value={username} className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" required />
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
                <button type="submit" className="btn btn-success btn-lg">
                    Update
                </button>
            </div>

        </form>
    );

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={`${API}/user/photo/${username_for_photo}`}
                            className="img img-fluid img-thumbnail mb-3"
                            style={{ maxWidth: '100%', maxHeight: "auto" }}
                            alt="user profile"
                        />
                    </div>
                    <div className="col-md-8 mb-5">{profileUpdateForm()}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProfileUpdate;