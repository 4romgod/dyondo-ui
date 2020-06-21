import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from "../../components/Layout";
import { useState } from 'react';
import { listBlogCatTag } from "../../actions/blog";
import Card from '../../components/blog/Card/Card';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

import Search from "../../components/blog/Search";


function Blogs({ blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router }) {

    function head() {
        return <Head>
            <title>Programming blogs | {APP_NAME}</title>
            <meta name="description" content="Programming Blogs and tutorials on react node next android mobile development and web development" />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest web development tutorials | ${APP_NAME}`} />
            <meta property="og:description" content={`Programming blogs and tutorials on react node next android mobile development and web development | ${APP_NAME}`} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/images/smile.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/images/smile.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    }

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    function showAllTags() {
        function showTag(tag, index) {
            return (
                <Link href={`/tags/[slug]`} as={`/tags/${tag.slug}`} key={index}>
                    <a className="btn btn-outline-info btn-sm mr-1 ml-1 mt-3"
                        style={{ maxWidth: '100%', overflowX: 'auto' }}
                    >
                        {`#${tag.name}`}
                    </a>
                </Link>
            )

        }
        return tags.map(showTag);
    }


    function showAllBlogs() {
        function showBlog(blog, index) {
            return (
                <article key={index}>
                    <Card blog={blog} />
                </article>
            )
        }
        return blogs.map(showBlog);
    }


    function loadMore() {
        let toSkip = skip + limit;  //skip already loaded blogs

        listBlogCatTag(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    }


    function loadMoreButton() {
        return (
            (size > 0) && (size >= limit) && (
                <div className="text-center pt-5 pb-5">
                    <button className="btn btn-success btn-lg" onClick={loadMore}>
                        Load more
                    </button>
                </div>
            )
        )
    }


    function showLoadedBlogs() {
        function showBlog(blog, index) {
            return (
                <article key={index}>
                    <Card blog={blog} />
                </article>
            )
        }
        return loadedBlogs.map(showBlog);
    }


    return (
        <React.Fragment>
            {head()}

            <Layout>
                <main className="bg-white">
                    <div className="pb-5">

                        <header className="bg-white">

                            <div className="col-md-12 pl-0 pr-0 text-center width-overflow">
                                <div className="bg-white pt-5 pb-3">
                                    <h1>Coding Blogs and Tutorials</h1>
                                </div>
                            </div>

                        </header>

                        <div className="container text-center">
                            <div className="row ml-0 mr-0">
                                <Search />
                            </div>
                        </div>

                        <div className="row ml-0 mr-0 mt-5">

                            {/** holds the blogs */}
                            <div className="col-md-8 pl-3 pr-3">
                                <div>
                                    <div className="container-fluid pl-0 pr-0">{showAllBlogs()}</div>

                                    <div className="container-fluid pl-0 pr-0">{showLoadedBlogs()}</div>

                                    {loadMoreButton()}
                                </div>
                            </div>

                            {/** holds categories and tags */}
                            <div className="col-md-4" style={{ height: '100%' }}>
                                <div className="pl-3 pr-3 pt-5 pb-5 bg-white shadow">
                                    <div className="pb-3">
                                        <h4
                                            className="btn btn-info btn-block"
                                            style={{
                                                backgroundColor: '#343a40',
                                                border: 'none'
                                            }}
                                        >
                                            Popular Tags
                                    </h4>

                                        {showAllTags()}
                                    </div>

                                    <br />

                                    <div className="pt-5">
                                        <h4
                                            className="btn btn-info btn-block"
                                            style={{
                                                backgroundColor: '#343a40',
                                                border: 'none'
                                            }}
                                        >
                                            Popular Articles
                                        </h4>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </main>
            </Layout>
        </React.Fragment>
    )
}

//getInitialProps, enables ssr on first load
Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 4;

    return listBlogCatTag(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogsSkip: skip
            }
        }
    });
}

export default withRouter(Blogs); 