import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, updateProfile } from "../../actions/user";
import { API } from "../../config";


function ProfileUpdate() {
    const [values, setValues] = useState({
        username: '',
        username_for_photo: '',
        name: '',
        email: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: process.browser && new FormData()
    });

    const { username, username_for_photo, name, email, about, password, error, success, loading, photo, userData } = values;
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
            // if a photo is being uploaded, we take the first photo   
            const value = (name === 'photo') ? event.target.files[0] : event.target.value;

            userData.set(name, value);

            setValues({ ...values, [name]: value, userData, error: false, success: false });
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
                        password: '',
                        success: true,
                        loading: false
                    });
                });

            }
        });
    }


    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-info">
                    Profile photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>
            {/*<div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="text" value={email} className="form-control" />
            </div>*/}
            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password (Leave blank to ignore)</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>
            <div>
                {showSuccess()}
                {showError()}
                {showLoading()}
            </div>
            <div>
                <button type="submit" className="btn btn-success btn-lg" disabled={!username || !name || !email}>
                    Update
                </button>
            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>

    );

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
                Profile updated
            </div>);
    };

    const showLoading = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                Loading...
            </div>);
    };

    return (
        <React.Fragment>
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