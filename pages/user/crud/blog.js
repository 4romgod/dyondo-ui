import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogCreate from "../../../components/crud/BlogCreate";


function CreateBlog() {
    
    return (
        <Layout>
            <Private>
                <div className="bg-white">

                    <div className="">

                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 mt-3 text-center">
                                <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                    <h1><strong>Create a new Blog</strong></h1>
                                </div>
                            </div>

                            <div className="col-md-12 mt-3 pb-5 container-blog-component">
                                <div className="card border-0 bg-white pt-3 pb-3">
                                    <BlogCreate />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
};

export default CreateBlog;