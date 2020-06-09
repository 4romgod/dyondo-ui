import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogRead from "../../../components/crud/BlogRead";
import Link from "next/link";


function Blog() {
    return (
        <Layout>
            <Admin>
                <div className="bg-white">
                    <div className="container">

                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 mt-2 text-center">
                                <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                    <h1>Manage Blogs</h1>
                                </div>
                            </div>

                            <div className="col-md-12 mt-3">
                                <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                    <BlogRead />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </Admin>
        </Layout>
    )
};

export default Blog;