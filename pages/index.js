import React, { useState } from "react";
import Layout from '../components/Layout';
import Head from 'next/head';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import Search from "../components/blog/Search";

const Index = () => {
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 0);
    }

    function head() {
        return <Head>
            <title>Home | {APP_NAME}</title>
            <meta name="description" content="Best programming blogs and tutorials on React, Node, Java and
                                    Much more" />
            <link rel="canonical" />
            <meta property="og:title" content={`Home | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Home" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`/images/logo.png`} />
            <meta property="og:image:secure_url" content={`/images/logo.png`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />

            <link rel="stylesheet" href="/css/home.css" />

        </Head>
    }

    return (
        <Layout>
            {head()}
            <article className="overflow-hidden bg-white" onClick={handleClick}>

                <div className="heading-container animate__animated animate__fadeIn">
                    <div className="row ml-0 mr-0">
                        <div className="col-md-12 pl-0 pr-0 text-center">

                            <p className="home-featured-img"></p>

                            <div className="heading-text">
                                <h1 className="font-weight-bold" style={{ color: 'white' }}>
                                    PROGRAMING BLOGS AND TUTORIALS
                                </h1>
                                <p style={{ color: 'white' }}>
                                    Best programming blogs and tutorials on React, Node, Java and
                                    Much more
                                </p>
                                <div className="container">
                                    <Search closeSearch={isClicked} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </article>
        </Layout>
    );
};


export default Index;