import React, { useState } from "react";
import Head from 'next/head';
import Layout from "../../components/Layout";
import { singleTag } from "../../actions/tag";
import SmallCard from "../../components/blog/SmallCard/SmallCard";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Search from "../../components/blog/Search";
import HeadTags from "../../components/HeadTags/HeadTags";

function Tag({ tag, blogs, query }) {
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 0);
    }

    return (
        <React.Fragment>

            <HeadTags
                title={tag.name}
                ogTitle={`${tag.name}`}
                description={`Best programming blogs and tutorials on ${tag.name}`}
                path={`/tags/${query.slug}`}
                pathImg={`/images/smile.jpg`}
            />

            <Layout>
                <div className="bg-white pb-5" onClick={handleClick} style={{marginBottom: "100px"}}>
                    <div className="container pt-3">
                        <div>
                            <div className="row ml-0 mr-0">
                                <div className="col-md-12 pb-2 text-center">
                                    <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5 animate__animated animate__fadeIn">
                                        <h1>Best Blogs and Tutorials on {tag.name}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row ml-0 mr-0 pb-5">
                            <Search closeSearch={isClicked} />
                        </div>

                        {/* blogs to match tag */}
                        <div className="row ml-0 mr-0">
                            {blogs.map((blog, index) => {
                                return (
                                    <div className="col-md-4" key={index}>
                                        <SmallCard blog={blog} />
                                    </div>)
                            })}
                        </div>

                    </div>
                </div>

            </Layout>
        </React.Fragment>
    )
}

Tag.getInitialProps = ({ query }) => {
    return singleTag(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            return { tag: data.tag, blogs: data.blogs, query }
        }
    });
}

export default Tag;