import Layout from "../components/Layout";
import { withRouter } from 'next/router';
import SigninComponent from "../components/auth/SigninComponent";

function Signup({ router }) {

    function showRedirectMessage() {
        if (router.query.message) {
            return (
                <div className="alert alert-danger">
                    {router.query.message}
                </div>
            )
        }
        else {
            return;
        }
    }

    return (
        <Layout>
        <div className="bg-white" style={{marginBottom: "100px"}}>
            <div className="container pt-4" style={{ height: '100vh' }}>

                <div className="bg-white shadow pt-5 pb-5 pl-4 pr-4">
                    <h2 className="text-center">Signin</h2>

                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            {showRedirectMessage()}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <SigninComponent />
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </Layout>
    )
};

export default withRouter(Signup);