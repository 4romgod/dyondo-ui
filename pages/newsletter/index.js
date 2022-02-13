import React, { useState } from 'react';
import { newsletter } from "../../actions/contact";
import Head from 'next/head';
import Router from 'next/router';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import newsletterStyle from "../../STYLES/newsletterStyle";
import Layout from '../../components/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
toast.configure();

function Newsletter() {
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        success: '',
        error: '',
        loading: ''
    });

    const { fullname, email, success, error, loading } = values;

    function head() {
        return <Head>
            <title>Newletter | {APP_NAME}</title>
            <meta name="description" content={`Signup for our newsletter | ${APP_NAME}`} />
            <link rel="canonical" />
            <meta property="og:title" content={`Newsletter | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Newsletter" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/newsletter`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`/images/logo.png`} />
            <meta property="og:image:secure_url" content={`/images/logo.png`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    }

    function handleChange(name) {
        return (event) => {
            setValues({ ...values, [name]: event.target.value });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        { toast.dismiss() }

        setValues({ ...values, loading: true, success: false, error: false });

        newsletter({ fullname, email })
            .then( (response) => {
                if (response.error) {
                    toast.dismiss();
                    toast.error(response.error);
                    setValues({ ...values, error: response.error, loading: false, success: false });
                } else {
                    toast.dismiss();
                    toast.success(response.success);
                    setValues({ ...values, error: false, loading: false, success: response.success });

                    setTimeout(() => Router.push(`/`), 3000)
                }
            }).catch(err => {
                toast.dismiss();
                toast.error(err);
            });

    }

    return (
        <React.Fragment>
            <Layout>
                {head()}

                <ToastContainer />

                <style jsx global>
                    {newsletterStyle}
                </style>

                <div className="newsletter-page">

                    <div className="container-newsletter animate__animated animate__fadeIn">
                        <div className="container-header text-center">
                            <h4 style={{ color: 'rgb(77,77,77)', fontWeight: 'bold' }}>{`${APP_NAME}`} Newsletter</h4>
                            <p>Programming, Web Development, and Much more</p>
                        </div>

                        <div className="container-form">
                            <div className="text-center">
                                <p style={{ color: 'rgb(77,77,77)' }}>
                                    Join the community and receive monthly newsletters as well as exclusive content that will help improve your skills as a developer!
                                </p>
                            </div>

                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            onChange={handleChange('fullname')}
                                            name="fullname"
                                            value={fullname}
                                            type="text"
                                            placeholder="Name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            onChange={handleChange('email')}
                                            name="email"
                                            value={email}
                                            type="email"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button className="form-control btn btn-success" type="submit">
                                            Subscribe
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="text-center" style={{ fontSize: '0.8rem' }}>
                                We respect your privacy. Unsubscribe at any time.
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default Newsletter;