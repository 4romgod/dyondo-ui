import Head from 'next/head';
import Link from 'next/link';
import Layout from "../../components/Layout";
import Form from "../../components/Form";
import { useState, useEffect } from 'react';
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';


function UserProfile({ user, blogs, query }) {

    function head() {
        return <Head>
            <title>{user.username} | {APP_NAME}</title>
            <meta name="description" content={`Blogs by ${user.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
            <meta property="og:description" content={`Blogs by ${user.username}`} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/images/smile.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/images/smile.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    }

    function showUserBlogs() {

        function createBlog(blog, index) {
            return (
                <div className="mt-4 mb-4" key={index}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="lead"><b>{blog.title}</b></a>
                    </Link>
                </div>
            )
        }
        return blogs.map(createBlog);
    }


    return (
        <React.Fragment>
            {head()}
            <Layout>
                <div className="bg-white">
                    <div className="container pt-3 pb-5">

                        {/* holds the user information */}
                        <div className="row ml-0 mr-0">

                            <div className="col-md-12">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <div className="row">

                                            {/* holds the profile photo */}
                                            <div className="col-md-4">
                                                <img
                                                    className="img img-fluid img-thumbnail mb-3"
                                                    src={`${API}/user/photo/${user.username}`}
                                                    alt="User profile photo"
                                                    style={{
                                                        maxWidth: '100%',
                                                        maxHeight: '150px'
                                                    }}
                                                />
                                            </div>

                                            {/* holds the name and time */}
                                            <div className="col-md-8 pl-4">
                                                <h5>{user.name}</h5>
                                                <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                                                <p>{user.about}</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <br />

                        {/* holds blogs and the form */}
                        <div className="row ml-0 mr-0">

                            {/* show all blogs by user */}
                            <div className="col-md-6 mb-3">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <h4 className="card-title bg-pr pt-4 pb-4 pl-4 pr-4 text-light text-center">Recent blogs by {user.name}</h4>
                                        {showUserBlogs()}
                                    </div>
                                </div>
                            </div>

                            {/* contact user form */}
                            <div className="col-md-6">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <h4 className="card-title bg-pr pt-4 pb-4 pl-4 pr-4 text-light text-center">Message {user.name}</h4>
                                        <br />
                                        <Form authorEmail={user.email} />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </Layout>
        </React.Fragment>
    )

}


UserProfile.getInitialProps = ({ query }) => {
    return userPublicProfile(query.username).then(data => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            //console.log(data);
            return {
                user: data.user,
                blogs: data.blogs,
                query
            }
        }

    });
}

export default UserProfile;