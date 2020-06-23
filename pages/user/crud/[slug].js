import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogUpdate from "../../../components/crud/BlogUpdate";


function Blog() {

    return (
        <Layout>
            <Private>
                <div className="bg-white">
                    <div className="container">
                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 mt-4 pb-4 text-center">
                                <div className="card border-0 bg-white pt-3 pb-3">
                                    <h1>Update Blog</h1>
                                </div>
                            </div>

                            <div className="col-md-12 pb-4">
                                <div className="card border-0 bg-white pt-2 pb-3">
                                    <BlogUpdate />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
};

export default Blog;