import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogRead from "../../../components/crud/BlogRead";
import { isAuth } from "../../../actions/auth";


function Blog() {
    const username = isAuth() && isAuth().username;

    return (
        <Layout>
            <Private>
                <div className="bg-white">
                    <div className="container">
                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 mt-4 pb-4 text-center">
                                <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                    <h1>Manage Blogs</h1>
                                </div>
                            </div>

                            <div className="col-md-12 mt-4 pb-4">
                                <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                    <BlogRead username={username} />
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