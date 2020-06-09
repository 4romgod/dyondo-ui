import Head from 'next/head';
import Link from 'next/link';
import Layout from "../../components/Layout";
import { useState, useEffect } from 'react';

import { singleBlog, listRelated } from "../../actions/blog";

import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from "../../components/blog/SmallCard";
import DisqusThread from "../../components/DisqusThread";


function SingleBlog({ blog, query }) {
    const [related, setRelated] = useState([]);

    // fetch related
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
                <Link key={index} href={`/categories/${cat.slug}`}>
                    <a className="btn btn-outline-info btn-lg btn-sq ml-1 mr-1 mt-3">{cat.name}</a>
                </Link>
            )
        }
        return blog.categories.map(showCat);
    }

    function showBlogTags(blog) {
        function showTag(tag, index) {
            return (
                <Link key={index} href={`/tags/${tag.slug}`}>
                    <a className="btn btn-outline-info btn-lg btn-sq ml-1 mr-1 mt-3">{`#${tag.name}`}</a>
                </Link>
            )
        }
        return blog.tags.map(showTag);
    }

    function showRelatedBlogs() {
        function createRelated(blog, index) {
            return (
                <div className="col-md-4" key={index}>
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
            <main>
                <article>

                    {/** holds the image */}
                    <div className="row ml-0 mr-0">
                        <img
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                            className="img img-fluid featured-image"
                        />
                    </div>

                    {/** display categories and tags */}
                    <div className="container mt-3">
                        <div className="row ml-0 mr-0">
                            <div className="col-md-1"></div>
                            <div className="bg-white col-md-10 pb-5 pt-3 pl-5 pr-5 text-center">
                                {showBlogCategories(blog)}
                                {showBlogTags(blog)}
                                <br /><br />
                            </div>
                            <div className="col-md-1"></div>

                        </div>
                    </div>


                    {/** display main content*/}
                    <div className="row ml-0 mr-0">

                        <div className="col-md-2"></div>

                        {/** display blog author and body  */}
                        <div className="col-md-8 pl-0 pr-0">
                            <div className=" bg-white mt-5 bt-4 pb-5 pl-3 pr-3">
                                {/** holds the title */}
                                <h4 className="display-4 pb-5 pt-5 font-weight-bold">
                                    {blog.title}
                                </h4>

                                {/** display blog author */}
                                <p className="lead mt-3 mark">
                                    Written by {' '}
                                    <Link href={`/profile/${blog.author.username}`}>
                                        <a>{blog.author.username}</a>
                                    </Link>
                                    {' '}| Published {moment(blog.updatedAt).fromNow()}
                                </p>

                                {/** display blog body  */}
                                <div className="lead blog-body">
                                    {renderHTML(blog.body)}
                                </div>
                            </div>
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
                        <div className="mt-4">
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