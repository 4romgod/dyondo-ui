import HeadTags from "../../components/HeadTags/HeadTags";
import Link from 'next/link';
import Layout from "../../components/Layout";
import Form from "../../components/Form";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';


function UserProfile({ user, blogs, query }) {


    function showUserBlogs() {

        function createBlog(blog, index) {
            return (
                <div className="" key={index}>
                    <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                        <a
                            className="btn btn-outline-secondary btn-block text-left pt-3 pb-3 pr-2"
                            style={{
                                color: 'rgb(41,41,41)',
                                overflow: 'hidden',
                                borderBottom: index !== blogs.length - 1 ? '0' : 'null'
                            }}
                        >
                            <div>
                                <b style={{ width: '100%', overflowX: 'scroll' }}>
                                    {blog.title}
                                </b>
                            </div>
                            <div>
                                <small>Created {moment(blog.createdAt).fromNow()}</small>
                            </div>
                        </a>
                    </Link>
                </div>
            )
        }
        return blogs.map(createBlog);
    }


    function fetchAndShowImage() {
        let URL = `${API}/user/photo/${user.username}`;
        return (
            <img
                className="img img-fluid img-thumbnail mb-3"
                src={`${API}/user/photo/${user.username}`}
                alt="User profile photo"
                style={{
                    maxWidth: '100%',
                    maxHeight: '150px'
                }}
            />
        )
    }


    return (
        <React.Fragment>

            <HeadTags
                title={user.username}
                ogTitle={user.username}
                description={`Blogs by ${user.username}`}
                path={`/profile/${query.username}`}
                pathImg={`/user/photo/${query.username}`}
            />

            <Layout>
                <div className="bg-white" style={{ marginBottom: "100px" }}>
                    <div className="container pt-3 pb-5">

                        {/* holds the user information */}
                        <div className="row ml-0 mr-0">

                            <div className="col-md-12">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <div className="row">

                                            {/* holds the profile photo */}
                                            <div className="col-md-4">
                                                {fetchAndShowImage()}
                                            </div>

                                            {/* holds the name and time */}
                                            <div className="col-md-8 pl-4">
                                                <h5>{user.name}</h5>
                                                <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                                                <p>{user.about}</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <br />

                        {/* holds blogs and the form */}
                        <div className="row ml-0 mr-0">

                            {/* show all blogs by user */}
                            <div className="col-md-6 mb-3">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <h4 className="card-title bg-pr pt-4 pb-4 pl-4 pr-4 text-light text-center">Recent blogs by {user.name}</h4>
                                        {showUserBlogs()}
                                    </div>
                                </div>
                            </div>

                            {/* contact user form */}
                            <div className="col-md-6">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <h4 className="card-title bg-pr pt-4 pb-4 pl-4 pr-4 text-light text-center">Message {user.name}</h4>
                                        <br />
                                        <Form authorEmail={user.email} />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </Layout>
        </React.Fragment>
    )

}


UserProfile.getInitialProps = ({ query }) => {
    return userPublicProfile(query.username).then(data => {
        if (data.error) {
            console.log(data.error);
        }
        else {
            //console.log(data);
            return {
                user: data.user,
                blogs: data.blogs,
                query
            }
        }

    });
}

export default UserProfile;