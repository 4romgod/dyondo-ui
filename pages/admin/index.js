import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";

import Link from "next/link";

function AdminIndex() {
    return (
        <Layout>
            <Admin>
                <div className="bg-white">

                    <div className="container pb-5">

                        <div className="row">

                            <div className="col-md-12 text-center mt-2 mb-3">
                                <div className="card border-0 bg-white pt-5 pb-5 pl-5 pr-5">
                                    <h2>Admin DashBoard</h2>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="row ml-0 mr-0">

                                    <div className="col-md-4 pl-0">
                                        <ul className="list-group">
                                            <Link href="/admin/crud/category-tag">
                                                <li className="list-group-item btn btn-outline-success">
                                                    <a style={{ color: 'black', borderBottom: '0' }}>
                                                        Create Category
                                                    </a>
                                                </li>
                                            </Link>
                                            <Link href="/admin/crud/category-tag">
                                                <li className="list-group-item btn btn-outline-success">
                                                    <a style={{ color: 'black', borderBottom: '0' }}>
                                                    Create Tag
                                                    </a>
                                                </li>
                                            </Link>
                                            <a href="/admin/crud/blog">
                                                <li className="list-group-item btn btn-outline-success" style={{ color: 'black', borderBottom: '0' }}>
                                                    Create Blog
                                                </li>
                                            </a>
                                            <Link href="/admin/crud/blogs">
                                                <li className="list-group-item btn btn-outline-success">
                                                    <a style={{ color: 'black', borderBottom: '0' }}>
                                                        Update/Delete Blogs
                                                    </a>
                                                </li>
                                            </Link>
                                            <Link href="/user/update">
                                                <li className="list-group-item btn btn-outline-success">
                                                    <a style={{ color: 'black' }}>
                                                        Update Profile
                                                    </a>
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>

                                    <div className="col-md-8 shadow bg-white">
                                        right
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

export default AdminIndex;