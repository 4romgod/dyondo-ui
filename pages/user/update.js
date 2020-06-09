import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";

function UserProfileUpdate() {
    return (
        <Layout>
            <Private>
                <div className="bg-white">
                    <div className="container">

                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 mt-2 text-center">
                                <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                    <h1>Update Profile</h1>
                                </div>
                            </div>

                            <div className="col-md-12 mt-3 pb-5">
                                <div className="card border-0 bg-white pt-5 pb-3">
                                    <ProfileUpdate />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
};

export default UserProfileUpdate;