import Head from 'next/head';
import Layout from "../../../components/Layout";
import { getTagsByField } from "../../../actions/tag";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import HeadTags from "../../../components/HeadTags/HeadTags";
import { useState } from 'react';
import TagCard from "../../../components/Tag/SmallCard/TagCard";
import Search from "../../../components/blog/Search";

function Tags({ tags, topic, query }) {
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 0);
    }

    return (
        <React.Fragment>
            <HeadTags
                title={topic}
                ogTitle={`${topic}`}
                description={`Best ${topic} blogs and tutorials`}
                path={`/tags/topic/${topic}`}
                pathImg={`/images/smile.jpg`}
            />

            <Layout>
                <div onClick={handleClick}>
                    <div className="bg-white pb-5" style={{marginBottom: "100px"}}>
                        <div className="container pt-3">
                            <div className="row ml-0 mr-0">
                                <div className="col-md-12 text-center">
                                    <div className="card border-0 bg-white pt-4 pb-3 animate__animated animate__fadeIn">
                                        <h1>Best Tutorials on {topic.charAt(0).toUpperCase() + topic.slice(1)}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="row ml-0 mr-0">
                                <Search closeSearch={isClicked} />
                            </div>

                            {/* blogs to match tag */}
                            <div className="pt-4">
                                <div className="row ml-0 mr-0">
                                    {tags.map((tag, index) => {
                                        return (
                                            <div className="col-sm-6 col-md-4" key={index} style={{ cursor: 'pointer' }}>
                                                <TagCard tag={tag} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}

Tags.getInitialProps = ({ query }) => {
    return getTagsByField(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            return { tags: data, topic: query.slug };
        }
    });
}

export default Tags;