import Layout from "../components/Layout";
import Link from "next/link";
import Form from "../components/Form";

function Index() {
    return (
        <Layout>
            <div className="container pb-5">
                <div className="row ml-0 mr-0">

                    <div className="col-md-8 bg-white offset-md-2 shadow mt-3 pt-5 pb-5 pl-3 pr-3">
                        <h2 className="text-center pb-3">Contact Us</h2>
                        <Form />
                    </div>

                </div>
            </div>
        </Layout>
    )
};

export default Index;