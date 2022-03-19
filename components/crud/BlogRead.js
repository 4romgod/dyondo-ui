import React, { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import FullPageLoader from "../Loader/FullPageLoader";
import moment from "moment";
import { dyondoClient } from "../../helpers/utils";

const BlogRead = ({ username }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = getCookie("token");

    useEffect(() => {
        initBlogs();
    }, []);

    const initBlogs = async () => {
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

    const deleteConfirm = async (slug) => {
        const answer = window.confirm("Are you sure you want to delete your blog?");
        if (answer) {
            setLoading(true);

            try {
                await dyondoClient.deleteRemoveBlog({ slug }, { headers: { Authorization: `Bearer ${token}` } });
                toast.dismiss();
                toast.success(`${slug} successfully deleted!`);
                initBlogs();
            } catch (error) {
                console.log(error)
                toast.dismiss();
                toast.error("Something went wrong while deleting Blog");
                setLoading(false);
            }
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