import Layout from "../../components/Layout";
import Private from "../../components/auth/Private"; 
import Link from "next/link";
import { getCookie } from "../../actions/auth";
import { getProfile } from "../../actions/user";

import { API } from "../../config";

import { useEffect, useState } from "react";

function UserIndex() {
    const [values, setValues] = useState({
        name: '',
        username: '',
        about: '',

        error: '',
        loading: ''
    });

    const { username, name, about, error, loading } = values;
    const token = getCookie('token');

    function initUser() {
        getProfile(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            }
            else {
                setValues({ ...values, username: data.username, name: data.name, about: data.about, loading: false });
            }
        });
    }

    useEffect(() => {
        initUser();
    }, []);

    return (
        <Layout>
            <Private>
                <div className="bg-white">
                    <div className="container pb-5">
                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 mt-4 pb-4 text-center">
                                <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                    <h1>User Dashboard</h1>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-group">

                                    <a href="/user/crud/blog">
                                        <li className="list-group-item btn btn-outline-success"
                                            style={{
                                                color: 'black',
                                            }}>
                                            Create Blog
                                        </li>
                                    </a>

                                    <a href="/user/crud/blogs">
                                        <li className="list-group-item btn btn-outline-success"
                                            style={{
                                                color: 'black',
                                                borderTop: '0',
                                                borderBottom: '0'
                                            }}>
                                            Update/Delete Blogs
                                        </li>
                                    </a>

                                    <a href="/user/update">
                                        <li className="list-group-item btn btn-outline-success"
                                            style={{
                                                color: 'black',
                                            }}>
                                            Update Profile
                                        </li>
                                    </a>

                                </ul>
                            </div>

                            <div className="col-md-8">
                                <div className="shadow pt-4 pb-5 pr-3">
                                    <div className="row ml-0 mr-0">
                                        <div className="col-md-3">
                                            <img
                                                src={`${API}/user/photo/${username}`}
                                                alt="profile photo"
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        </div>

                                        <div className="col-md-9">
                                            <div className="pt-2">
                                                <h4>{name}</h4>
                                            </div>
                                            <div className="mb-4">
                                                {about ?
                                                    <p>{about}</p>
                                                    :
                                                    <Link href={`/user/update`}>
                                                        <a style={{
                                                            color: 'grey'
                                                        }}
                                                        >
                                                            Edit about me
                                                                </a>
                                                    </Link>
                                                }
                                            </div>
                                            <div>
                                                <Link href={`/user/update`}>
                                                    <a className="btn btn-outline-success btn-sm">update profile</a>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </Private>
        </Layout>
    )
};

export default UserIndex;