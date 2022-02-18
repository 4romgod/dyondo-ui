import React, { useState } from "react";
import Layout from "../../components/Layout";
import SmallCard from "../../components/blog/SmallCard/SmallCard";
import Search from "../../components/blog/Search";
import HeadTags from "../../components/HeadTags/HeadTags";
import { dyondoClient } from "../../helpers/utils";

const Tag = ({ tag, blogs, query }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
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

Tag.getInitialProps = async ({ query }) => {
    try {
        const tagData =  await dyondoClient.getRetrieveTag({slug: query.slug});
        const blogData = await dyondoClient.getRetrieveBlogs({tag: query.slug});
        return { tag: tagData.data, blogs: blogData.data, query };
    } catch (err) {
        console.log(err);
    }
}

export default Tag;