import React, { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { removeBlog } from "../../actions/blog";
import { ToastContainer, toast } from "react-toastify";
import { dyondoClient } from "../../helpers/utils";
import FullPageLoader from "../Loader/FullPageLoader";
import moment from "moment";

const BlogRead = ({ username }) => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const token = getCookie("token");

    useEffect(() => {
        loadBlogs();
    }, []);


    const loadBlogs = async () => {
        setLoading(true);
        try {
            const requestParams = username ? { author: username } : {};
            const response = await dyondoClient.getRetrieveBlogs(requestParams);
            setBlogs(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const deleteConfirm = (slug) => {
        const answer = window.confirm("Are you sure you want to delete your blog?");
        if (answer) {
            setLoading(true);

            removeBlog(slug, token).then((data) => {
                if (data.error) {
                    console.log(data.error);
                    setLoading(false);

                    toast.dismiss();
                    toast.error("Something went wrong. Try again later");
                } else {
                    setMessage(data.message);
                    loadBlogs();
                    setLoading(false);
                    toast.dismiss();
                    toast.success("Successfully deleted!");
                }
            })
        }
    }

    const showUpdateBtn = (blog) => {
        if (isAuth()) {
            if (isAuth().role === 0) {
                return (
                    <a href={`/user/crud/${blog.slug}`} className="btn btn-sm btn-warning ml-2">update</a>
                )
            } else if (isAuth().role === 1) {
                return (
                    <a href={`/admin/crud/${blog.slug}`} className="btn btn-sm btn-warning ml-2">update</a>
                )
            }
        }
    }

    const showAllBlogs = () => {
        const showBlog = (blog, index) => {
            return (
                <div key={index} className="pb-5 animate__animated animate__fadeIn">
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