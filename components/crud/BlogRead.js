import Link from "next/link"
import { useState, useEffect } from "react";
import Router from "next/router";
import { withRouter } from 'next/router';
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

import FullPageLoader from "../FullPageLoader";


function BlogRead({ username }) {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);


    function loadBlogs() {
        list(username).then((data) => {
            if (data.error) {
                console.log(data.error);
                setLoading(false);
            }
            else {
                setBlogs(data);
                setLoading(false);
            }
        });
    }


    function deleteConfirm(slug) {
        let answer = window.confirm("Are you sure you want to delete your blog?")
        if (answer) { deleteBlog(slug); }
    }


    function deleteBlog(slug) {
        removeBlog(slug, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setMessage(data.message);
                loadBlogs();
            }
        })
    }


    function showUpdateBtn(blog) {
        if (isAuth() && isAuth().role === 0) {      // user is not admin
            return (
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className="btn btn-sm btn-warning ml-2">update</a>
                </Link>
            )
        }
        else if (isAuth() && isAuth().role === 1) {     // user is admin
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className="btn btn-sm btn-warning ml-2">update</a>
                </Link>
            )
        }
    }


    function showAllBlogs() {
        function showBlog(blog, index) {
            return (
                <div key={index} className="pb-5">
                    <h3>{blog.title}</h3>
                    <p className="mark">
                        Written by {blog.author.name} | published on {moment(blog.updatedAt).fromNow()}
                    </p>

                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>
                        delete
                    </button>

                    {showUpdateBtn(blog)}
                </div>
            )
        }

        return !loading && ( (blogs.length > 0) ? blogs.map(showBlog) : <div>No blogs by this user</div>);
    }

    return (
        <React.Fragment>

            {loading && <FullPageLoader />}

            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    {showAllBlogs()}
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogRead;