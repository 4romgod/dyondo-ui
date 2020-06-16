import Head from 'next/head';
import Link from 'next/link';
import Layout from "../../components/Layout";
import { useState, useEffect } from 'react';

import { singleBlog, listRelated } from "../../actions/blog";

import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import SmallCard from "../../components/blog/SmallCard/SmallCard";
import Author from "../../components/Author/Author";
import DisqusThread from "../../components/DisqusThread";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faFacebookSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import { FacebookIcon, TwitterIcon, FacebookShareButton, TwitterShareButton } from 'react-share';

import "./blog.css";

function SingleBlog({ blog, query }) {
    const [related, setRelated] = useState([]);

    function loadRelated() {
        listRelated({ blog }).then((data) => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setRelated(data);
            }
        });

    }

    // load related when the component mounts
    useEffect(() => {
        loadRelated();
    }, []);


    function head() {
        return <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
            <meta
                property="og:description"
                content={blog.mdesc} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blog/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    }

    function showBlogCategories(blog) {
        function showCat(cat, index) {
            return (
                <Link key={index} href={`/categories/[slug]`} as={`/categories/${cat.slug}`}>
                    <a className="btn btn-outline-info btn-sm btn-sq ml-1 mr-1 mt-3">{cat.name}</a>
                </Link>
            )
        }
        return blog.categories.map(showCat);
    }

    function showBlogTags(blog) {
        function showTag(tag, index) {
            return (
                <Link key={index} href={`/tags/[slug]`} as={`/tags/${tag.slug}`}>
                    <a className="btn btn-outline-info btn-sm btn-sq ml-1 mr-1 mt-3">{`#${tag.name}`}</a>
                </Link>
            )
        }
        return blog.tags.map(showTag);
    }

    function showRelatedBlogs() {
        function createRelated(blog, index) {
            return (
                <div className="col-md-4 pl-3 pr-3" key={index}>
                    <article>
                        <SmallCard blog={blog} />
                    </article>
                </div>
            )
        }

        return related.map(createRelated);
    }


    function showComments() {
        return (
            <div>
                <DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />
            </div>
        )
    }

    return <React.Fragment>
        {head()}
        <Layout>
            <main className="bg-white wb">
                <article>

                    <div className="row ml-0 mr-0 mb-4">
                        <div className="col-md-2"></div>

                        <div className="col-md-8 pl-0 pr-0 mt-3">
                            <div className="bg-white pb-3 pl-3 pr-3">

                                <div style={{ width: '100%', overflow: 'auto' }}>
                                    <h4 className="display-4 pb-3 pt-3 font-weight-bold">
                                        {blog.title}
                                    </h4>
                                </div>

                                <Author blog={blog} />

                            </div>
                        </div>

                        <div className="col-md-2"></div>
                    </div>

                    <div className="row ml-0 mr-0">
                        <div className="col-md-1"></div>
                        <div className="col-md-10 pl-0 pr-0">
                            <p className="blog-featured-img"
                                style={{
                                    backgroundImage: `url(${API}/blog/photo/${blog.slug})`
                                }}
                            />
                        </div>
                        <div className="col-md-1"></div>
                    </div>


                    <div className="row ml-0 mr-0">
                        <div className="col-md-2"></div>

                        <div className="col-md-8 pl-0 pr-0">

                            <div className=" bg-white mt-5 pt-3 pb-3 pl-3 pr-3">
                                <div className="lead" id="blog-body" style={{ width: '100%', overflow: 'auto' }}>
                                    {renderHTML(blog.body)}
                                </div>
                            </div>

                            <div className="pb-3 pl-3 pr-3">
                                {showBlogCategories(blog)}
                                {showBlogTags(blog)}
                            </div>

                            <div className="pt-3 pb-3 pl-3 pr-3" style={{ display: 'flex' }}>
                                <FacebookShareButton
                                    url={`${DOMAIN}/${blog.slug}`}
                                    quote={`${blog.mdesc}`}
                                    hashtag={`${blog.tags}`}
                                >
                                    <FacebookIcon size={32} />
                                </FacebookShareButton>

                                <TwitterShareButton
                                    title={`${blog.title} by ${blog.author.name}\n`}
                                    url={`${DOMAIN}/${blog.slug}`}
                                    hashtag={`#hashtag`}
                                //via={`${APP_NAME}`}
                                >
                                    <TwitterIcon size={32} />
                                </TwitterShareButton>
                            </div>

                            <hr />

                        </div>

                        <div className="col-md-2"></div>
                    </div>


                    {/** display related blogs */}
                    <div className="container pb-3 mt-5">
                        <h4 className="text-center pt-5 pb-3 h2">Related Blogs</h4>
                        <hr />
                        <div className="row ml-0 mr-0 mt-4">
                            {showRelatedBlogs()}
                        </div>
                    </div>

                    {/** display comments */}
                    <div className="container pb-5 mt-5">
                        <h4 className="text-center pt-2 pb-3 h2">Comments</h4>
                        <hr />
                        <div className="mt-4 pl-3 pr-3">
                            {showComments()}
                        </div>
                    </div>

                </article>
            </main>
        </Layout>
    </React.Fragment>
}


// getInitialProps, enables ssr on first load
// everyting it returns will be available as props
SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            return { blog: data, query }
        }
    });
}

export default SingleBlog;