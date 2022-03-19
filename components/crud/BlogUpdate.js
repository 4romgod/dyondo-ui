import React, { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from 'next/router';
import { getCookie } from "../../actions/auth";
import { updateBlog } from "../../actions/blog";
import { QuillFormats, QuillModules } from '../../helpers/quill';
import { ToastContainer, toast } from "react-toastify";
import FullPageLoader from "../Loader/FullPageLoader";
import Checkbox from "../Checkbox/Checkbox";
import quillStyle from "../../STYLES/quillStyle";
import { dyondoClient } from "../../helpers/utils";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogUpdate = ({ router }) => {
    const [tags, setTags] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]);
    const [body, setBody] = useState("");

    const [values, setValues] = useState({
        title: "",
        body: "",
        photoName: "",
        formData: ""
    });

    const [results, setResults] = useState({
        error: false,
        loading: false,
        success: ""
    });

    const { formData, title, blog, photoName } = values;
    const { error, success, loading } = results;

    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initBlog();
        initTags();
    }, [router]);

    const initBlog = async () => {
        if (router.query.slug) {
            setResults({ ...results, loading: true });

            try {
                const response = await dyondoClient.getRetrieveBlog({ slug: router.query.slug });
                setResults({ ...results, loading: false });
                setValues({ ...values, title: response.data.title });
                setBody(response.data.body);
                setOldCheckedTag(response.data.tags);
            } catch (error) {
                setResults({ ...results, error: error.message, loading: false });
                toast.dismiss();
                toast.error("Something went wrong. Try again later");
            }
        }
    }

    const setOldCheckedTag = (oldTags) => {
        const tagList = [];
        oldTags.map((tag) => {
            tagList.push(tag._id);
        });
        setCheckedTag(tagList);
    }

    const initTags = async () => {
        try {
            const response = await dyondoClient.getRetrieveTags({});
            setTags(response.data);
        } catch (error) {
            setResults({ ...results, error: error.message });
            toast.dismiss();
            toast.error("Something went wrong");
        }
    }

    const findOutCheckedTag = (tag) => {
        const result = checkedTag.indexOf(tag);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    }

    const showTags = () => {
        const createLi = (tag, index) => {
            return (
                <li key={index} className="list-unstyled">
                    <Checkbox
                        entity={tag}
                        handleChange={handleToggleTag}
                        handleChecked={findOutCheckedTag}
                    />
                </li>
            )
        }
        return (tags && tags.map(createLi));
    }

    const handleToggleTag = (tagId) => {
        return () => {
            setResults({ ...results, error: false });
            const clickedTag = checkedTag.indexOf(tagId);
            const all = [...checkedTag];
            if (clickedTag === -1) {
                all.push(tagId);
            } else {
                all.splice(clickedTag, 1);
            }

            setCheckedTag(all);
            formData.set("tags", all)
        }
    }

    const handleChange = (name) => {
        return (event) => {
            let value;
            if (name === 'photo') {
                value = event.target.files[0];
                const fileSize = value.size / 1024 / 1024;

                if (fileSize > 1) {
                    toast.dismiss();
                    toast.error("Image size should be less than 1MB");
                } else {
                    formData.set(name, value);
                    setResults({ ...results, error: false })
                    setValues({ ...values, photoName: value ? value.name : '', [name]: value, formData });
                }
            } else {
                value = event.target.value;
                formData.set(name, value);

                setResults({ ...results, error: false, loading: false, success: false })
                setValues({ ...values, [name]: value, formData });
            }
        }
    }

    const handleBody = (event) => {
        setBody(event);
        formData.set('body', event);
    }

    const editBlog = async (event) => {
        event.preventDefault();

        if (checkedTag.length > 5) {
            toast.dismiss();
            toast.error("Maximum Tags exceeded!");
            return;
        }

        setResults({ ...results, loading: true, error: false, success: false });

        updateBlog(formData, token, router.query.slug)
            .then(data => {
                if (data.error) {
                    toast.dismiss();
                    toast.error(data.error);
                    setResults({ ...results, error: data.error, loading: false });
                } else {
                    setResults({
                        ...results,
                        success: `Blog titled "${data.title}" is successfully updated`,
                        loading: false,
                        error: false
                    });

                    setValues({ ...values, title: '' })
                    Router.replace(`/blogs/[slug]`, `/blogs/${router.query.slug}`);
                }
            });
    }

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title || ''} onChange={handleChange("title")} />
                </div>

                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body || ''}
                        placeholder="Write blog content..."
                        onChange={handleBody}
                    />
                </div>

                <button type="submit" className="btn btn-success btn-lg" disabled={success || loading}>Update</button>
            </form>
        )
    }

    return (
        <React.Fragment>
            <style jsx global>
                {quillStyle}
            </style>

            <ToastContainer />

            <div>
                {loading && <FullPageLoader />}
            </div>

            <div className="container-fluid pb-5 animate__animated animate__fadeIn">
                <div className="row">
                    <div className="col-md-8">
                        {updateBlogForm()}
                    </div>

                    <div className="col-md-4 pt-4">
                        <div className="form-group pb-2">
                            <h4>Featured Image</h4>
                            <hr />
                            <small className="text-muted ml-4">Max size: 1MB</small><br />
                            <label className="btn btn-outline-info ml-4">
                                Upload featured image
                                <input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
                            </label>
                            <br />
                            <small className="text-muted ml-4">{photoName}</small>
                        </div>

                        <div>
                            <h4 className="mt-2">Tags</h4>
                            <hr />

                            <ul style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                                {showTags()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(BlogUpdate);