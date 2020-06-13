import Layout from "../components/Layout";
import Link from "next/link";
import Form from "../components/Form";

function Index() {
    return (
        <Layout>
            <div className="bg-white pb-5">

                <h2 className="text-center pb-3 pt-4">Contact Us</h2>

                <div className="container">
                    <div className="row ml-0 mr-0">
                        <div className="col-md-8 bg-white offset-md-2 shadow mt-3 pt-3 pb-5 pl-3 pr-3">
                            <Form />
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    )
};

export default Index;