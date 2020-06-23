import Layout from "../components/Layout";
import Link from "next/link";
import SignupComponent from "../components/auth/SignupComponent";


function Signin() {
    
    return (
        <Layout>
            <div className="container pt-4" style={{ height: '100vh' }}>

                <div className="bg-white shadow pt-5 pb-5 pl-4 pr-4">
                    <h2 className="text-center">Signup Now</h2>

                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <SignupComponent />
                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    )
};

export default Signin;