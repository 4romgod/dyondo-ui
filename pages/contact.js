import Layout from "../components/Layout";
import Form from "../components/Form";

function Index() {
    
    return (
        <Layout>
            <div className="bg-white pb-5">

                <h2 className="text-center pb-3 pt-4">Contact Us</h2>

                <div className="container">
                    <div className="row ml-0 mr-0">
                        <div className="col-md-3"></div>

                        <div className="col-md-6 bg-white shadow mt-3 pt-3 pb-5 pl-3 pr-3">
                            <Form />
                        </div>
                        
                        <div className="col-md-3"></div>

                    </div>
                </div>

            </div>
        </Layout>
    )
};

export default Index;