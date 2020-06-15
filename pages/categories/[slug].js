import Head from 'next/head';
import Layout from "../../components/Layout";
import { singleCategory } from "../../actions/category";
import SmallCard from "../../components/blog/SmallCard/SmallCard";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';


function Category({ category, blogs, query }) {

    function head() {
        return <Head>
            <title>{category.name} | {APP_NAME}</title>
            <meta name="description" content={`Best programming blogs and tutorials on ${category.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
            <meta
                property="og:description"
                content={`Best programming blogs and tutorials on ${category.name}`} />

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

                            {/* category name of page */}
                            <header>
                                <div className="col-md-12 pb-5 text-center">
                                    <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                        <h1>Available Tutorials on {category.name}</h1>
                                    </div>
                                </div>

                            </header>

                            {/* blogs to match category */}
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

Category.getInitialProps = ({ query }) => {
    return singleCategory(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            return { category: data.category, blogs: data.blogs, query }
        }
    });
}

export default Category;