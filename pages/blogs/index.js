import React, { useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { listBlogCatTag } from "../../actions/blog";
import Card from "../../components/blog/Card/Card";
import HeadTags from "../../components/HeadTags/HeadTags";
import Search from "../../components/blog/Search";

const Blogs = ({ blogs, tags, totalBlogs, blogsLimit, router }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 0);
    }

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const showAllTags = () => {
        const showTag = (tag, index) => {
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

    const showAllBlogs = () => {
        const showBlog = (blog, index) => {
            return (
                <article key={index}>
                    <Card blog={blog} />
                </article>
            )
        }
        return blogs.map(showBlog);
    }

    const loadMore = () => {
        const toSkip = skip + limit;  //skip already loaded blogs
        listBlogCatTag(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    }

    const loadMoreButton = () => {
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

    const showLoadedBlogs = () => {
        const showBlog = (blog, index) => {
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
            <HeadTags
                title={`Programming blogs`}
                ogTitle={`Latest web development tutorials`}
                description={`Programming blogs and tutorials on react node next android mobile development and web development`}
                path={`${router.pathname}`}
                pathImg={`/images/smile.jpg`}
            />

            <Layout>
                <div className="bg-white" onClick={handleClick} style={{ marginBottom: "100px" }}>
                    <div className="pb-5">
                        <div className="bg-white">
                            <div className="col-md-12 pl-0 pr-0 text-center width-overflow">
                                <div className="bg-white pt-5 pb-3">
                                    <h1>Best Programming Blogs and Tutorials</h1>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row ml-0 mr-0">
                                <Search closeSearch={isClicked} />
                            </div>
                        </div>

                        <div className="row ml-0 mr-0 mt-5">
                            <div className="col-md-8 pl-3 pr-3">
                                <div>
                                    <div className="container-fluid pl-0 pr-0">{showAllBlogs()}</div>

                                    <div className="container-fluid pl-0 pr-0">{showLoadedBlogs()}</div>

                                    {loadMoreButton()}
                                </div>
                            </div>

                            <div className="col-md-4" style={{ height: '100%' }}>
                                <div className="pl-3 pr-3 pt-5 pb-5 bg-white shadow">
                                    <div className="pb-3">
                                        <h4 className="btn btn-info btn-block"
                                            style={{ backgroundColor: '#343a40', border: 'none' }}
                                        >
                                            Popular Tags
                                        </h4>

                                        {showAllTags()}
                                    </div>

                                    <br />

                                    <div className="pt-5">
                                        <h4 className="btn btn-info btn-block"
                                            style={{ backgroundColor: '#343a40', border: 'none' }}
                                        >
                                            Popular Articles
                                        </h4>
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

Blogs.getInitialProps = () => {
    const skip = 0;
    const limit = 4;

    return listBlogCatTag(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
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