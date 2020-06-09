import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

import Link from "next/link";


function CategoryTag() {
    return (
        <Layout>
            <Admin>
                <div className="bg-white">

                    <div className="container pb-5">

                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 pb-3 text-center mt-2">
                                <div className="card border-0 bg-white pt-5 pb-5 pl-5 pr-5">
                                    <h2>Manage Categories and Tags</h2>
                                </div>
                            </div>


                            <div className="row ml-0 mr-0">

                                <div className="col-md-6 pr-2">
                                    <div className="container-fluid shadow bg-white pt-5 pb-5 pl-5 pr-5">
                                        <h4 className="text-center">Categories</h4>
                                        <Category />
                                    </div>
                                </div>

                                <div className="col-md-6  pl-2">
                                    <div className="container-fluid shadow bg-white pt-5 pb-5 pl-5 pr-5">
                                        <h4 className="text-center">Tags</h4>
                                        <Tag />
                                    </div>
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