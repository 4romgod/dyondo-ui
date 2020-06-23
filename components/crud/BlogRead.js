import Link from "next/link"
import { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

import FullPageLoader from "../Loader/FullPageLoader";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function BlogRead({ username }) {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);


    function loadBlogs() {
        setLoading(true);

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
        setLoading(true);

        removeBlog(slug, token).then((data) => {
            if (data.error) {
                console.log(data.error);
                setLoading(false);

                toast.dismiss();
                toast.error("Something went wrong. Try again later");
            }
            else {
                setMessage(data.message);
                loadBlogs();

                setLoading(false);

                toast.dismiss();
                toast.success("Successfully deleted!");
            }
        })
    }


    function showUpdateBtn(blog) {
        if (isAuth() && isAuth().role === 0) {      // user is not admin
            return (
                <a href={`/user/crud/${blog.slug}`} className="btn btn-sm btn-warning ml-2">update</a>
            )
        }
        else if (isAuth() && isAuth().role === 1) {     // user is admin
            return (
                <a href={`/admin/crud/${blog.slug}`} className="btn btn-sm btn-warning ml-2">update</a>
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

        return !loading && ((blogs.length > 0) ? blogs.map(showBlog) : <div>No blogs by this user</div>);
    }

    return (
        <React.Fragment>

            <ToastContainer />

            {loading && <FullPageLoader />}

            <div className="row">
                <div className="col-md-12">
                    {showAllBlogs()}
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogRead;