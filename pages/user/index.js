import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";

function UserIndex() {
    return (
        <Layout>
            <Private>
                <div className="bg-white">
                    <div className="container pb-5">
                        <div className="row ml-0 mr-0">

                            <div className="col-md-12 mt-4 pb-4 text-center">
                                <div className="card border-0 bg-white pt-3 pb-3 pl-5 pr-5">
                                    <h1>User Dashboard</h1>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-group">

                                    <a href="/user/crud/blog">
                                        <li className="list-group-item btn btn-outline-success"
                                            style={{
                                                color: 'black',
                                                border: '1px solid #eee'
                                            }}>
                                            <b>Create Blog</b>
                                        </li>
                                    </a>

                                    <a href="/user/crud/blogs">
                                        <li className="list-group-item btn btn-outline-success"
                                            style={{
                                                color: 'black',
                                                border: '1px solid #eee',
                                                borderTop: '0',
                                                borderBottom: '0'
                                            }}>
                                            <b>Update/Delete Blogs</b>
                                        </li>
                                    </a>

                                    <a href="/user/update">
                                        <li className="list-group-item btn btn-outline-success"
                                            style={{
                                                color: 'black',
                                                border: '1px solid #eee'
                                            }}>
                                            <b>Update Profile</b>
                                        </li>
                                    </a>

                                </ul>
                            </div>

                            <div className="col-md-8 shadow bg-white" >
                                right
                        </div>

                        </div>

                    </div>
                </div>
            </Private>
        </Layout>
    )
};

export default UserIndex;