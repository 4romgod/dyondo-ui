import Head from 'next/head';
import Layout from "../../../components/Layout";
import { getTagsByField } from "../../../actions/tag";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';

import TagCard from "../../../components/Tag/SmallCard/TagCard";

import Search from "../../../components/blog/Search";


function Tags({ tags, topic, query }) {

    function head() {
        return <Head>
            <title>{topic} | {APP_NAME}</title>
            <meta name="description" content={`Best programming blogs and tutorials on ${topic}`} />
            <link rel="canonical" href={`${DOMAIN}/tags/topic/${topic}`} />
            <meta property="og:title" content={`${topic} | ${APP_NAME}`} />
            <meta
                property="og:description"
                content={`Best programming blogs and tutorials on ${topic}`} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/tags/topic/${topic}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/images/smile.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/images/smile.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    }

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <div>
                    <div className="bg-white pb-5 mb-5">
                        <div className="container pt-3">
                            <div className="row ml-0 mr-0">
                                <div className="col-md-12 text-center">
                                    <div className="card border-0 bg-white pt-4 pb-3 animate__animated animate__fadeIn">
                                        <h1>Best Tutorials on {topic.charAt(0).toUpperCase() + topic.slice(1)}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="row ml-0 mr-0">
                                <Search />
                            </div>


                            {/* blogs to match tag */}
                            <div className="pt-4">
                                <div className="row ml-0 mr-0">
                                    {tags.map((tag, index) => {
                                        return (
                                            <div className="col-md-4" key={index} style={{ cursor: 'pointer' }}>
                                                <TagCard tag={tag} />
                                            </div>)
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
        //console.log(data);

        if (data.error) {
            console.log(data.error);
        }
        else {
            return { tags: data, topic: query.slug };
        }
    });
}

export default Tags;