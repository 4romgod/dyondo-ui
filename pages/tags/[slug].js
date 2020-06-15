import Head from 'next/head';
import Layout from "../../components/Layout";
import { singleTag } from "../../actions/tag";
import SmallCard from "../../components/blog/SmallCard";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';


function Tag({ tag, blogs, query }) {

    function head() {
        return <Head>
            <title>{tag.name} | {APP_NAME}</title>
            <meta name="description" content={`Best programming blogs and tutorials on ${tag.name}`} />
            <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
            <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
            <meta
                property="og:description"
                content={`Best programming blogs and tutorials on ${tag.name}`} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
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
                <main>
                    <div className="bg-white">
                        <div className="container pt-3">
                            <header>
                                <div className="row ml-0 mr-0">
                                    <div className="col-md-12 pb-5 text-center">
                                        <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                            <h1>Available Tutorials on {tag.name}</h1>
                                        </div>
                                    </div>
                                </div>
                            </header>

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
                </main>
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