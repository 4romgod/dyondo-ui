import Layout from "../../../../components/Layout";
import Admin from "../../../../components/auth/Admin";
import Tag from "../../../../components/crud/Tag";

function CategoryTag() {
    return (
        <Layout>
            <Admin>
                <div className="bg-white wb">

                    <div className="container-fluid pb-5 mb-5">

                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 pb-3 text-center mt-2">
                                <div className="card border-0 bg-white pt-5 pl-5 pr-5">
                                    <h2>Manage Categories and Tags</h2>
                                </div>
                            </div>


                            <div className="col-md-12 pl-2 container-cat">
                                <div className="container-fluid bg-white pl-5 pr-5">
                                    <Tag />
                                </div>
                            </div>


                        </div>


                    </div>

                </div>

            </Admin>
        </Layout>
    )
};

export default CategoryTag;