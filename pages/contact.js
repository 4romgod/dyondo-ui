import Layout from "../components/Layout";
import Link from "next/link";
import Form from "../components/Form";

function Index() {
    return (
        <Layout>
            <div className="container pb-5">
                <div className="row">

                    <div className="col-md-8 bg-white offset-md-2 shadow mt-3 pt-5 pb-5 pl-5 pr-5">
                        <h2 className="text-center pb-3">Contact Us</h2>
                        <Form />
                    </div>

                </div>
            </div>
        </Layout>
    )
};

export default Index;