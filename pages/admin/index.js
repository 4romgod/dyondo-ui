import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";
import { getCookie } from "../../actions/auth";
import { getProfile } from "../../actions/user";

import { API } from "../../config";

import { useEffect, useState } from "react";

function AdminIndex() {
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
            <Admin>
                <div className="bg-white">

                    <div className="container pb-5 mb-5">

                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 text-center mt-2 mb-3">
                                <div className="card border-0 bg-white pt-5 pb-5 pl-5 pr-5">
                                    <h2>Admin DashBoard</h2>
                                </div>
                            </div>

                            <div className="col-md-12 container-admin">
                                <div className="row ml-0 mr-0">

                                    <div className="col-md-4 pl-0 left mb-5">
                                        <ul className="list-group">
                                            <Link href="/admin/crud/category-tag">
                                                <li className="list-group-item btn btn-outline-success">
                                                    <a style={{ color: 'black', borderBottom: '0' }}>
                                                        Create Category
                                                    </a>
                                                </li>
                                            </Link>
                                            <Link href="/admin/crud/category-tag">
                                                <li className="list-group-item btn btn-outline-success">
                                                    <a style={{ color: 'black', borderBottom: '0' }}>
                                                        Create Tag
                                                    </a>
                                                </li>
                                            </Link>
                                            <a href="/admin/crud/blog">
                                                <li className="list-group-item btn btn-outline-success" style={{ color: 'black', borderBottom: '0' }}>
                                                    Create Blog
                                                </li>
                                            </a>
                                            <Link href="/admin/crud/blogs">
                                                <li className="list-group-item btn btn-outline-success">
                                                    <a style={{ color: 'black', borderBottom: '0' }}>
                                                        Update/Delete Blogs
                                                    </a>
                                                </li>
                                            </Link>
                                            <Link href="/user/update">
                                                <li className="list-group-item btn btn-outline-success">
                                                    <a style={{ color: 'black' }}>
                                                        Update Profile
                                                    </a>
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>

                                    <div className="col-md-8">
                                        <div className="shadow pt-4 pb-5">
                                            <div className="row ml-0 mr-0">

                                                <div className="col-md-3">
                                                    <p
                                                        style={{
                                                            backgroundColor: '#eee',
                                                            backgroundImage: `url(${API}/user/photo/${username})`,
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat',
                                                            height: '100px',
                                                            width: '110px',
                                                            margin: '0',
                                                            borderRadius: '50%',
                                                            border: '0.03rem solid rgb(241, 241, 241)',
                                                        }}
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

                    </div>
                </div>
            </Admin>
        </Layout>
    )
};

export default AdminIndex;