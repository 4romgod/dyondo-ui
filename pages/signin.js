import Layout from "../components/Layout";
import Link from "next/link";
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
            <div className="container" style={{ height: '100vh' }}>

                <div className="bg-white shadow mt-3 pt-5 pb-5 pl-4 pr-4">
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
        </Layout>
    )
};

export default withRouter(Signup);