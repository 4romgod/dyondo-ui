import Link from "next/link"
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from 'next/router';
import { getCookie, isAuth } from "../../actions/auth";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";
import { QuillFormats, QuillModules } from '../../helpers/quill';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import FullPageLoader from "../Loader/FullPageLoader";
import Checkbox from "../Checkbox/Checkbox";


function BlogUpdate({ router }) {

    // holds the list of and tags
    const [tags, setTags] = useState([]);

    // holds the list of checked tags
    const [checkedTag, setCheckedTag] = useState([]);

    const [body, setBody] = useState('');

    const [values, setValues] = useState({
        title: '',
        error: "",
        success: "",
        loading: false,
        formData: "",
        title: "",
        body: '',
        photoName: ''
    });

    const { error, success, loading, formData, title, blog, photoName } = values;
    const token = getCookie('token');


    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initBlog();
        initTags();
    }, [router]);

    // sets all the tags that were checked before
    function setOldCheckedTag(oldTags) {
        let tagList = [];
        oldTags.map((tag, index) => {
            tagList.push(tag._id);
        });
        setCheckedTag(tagList);
    }


    // initialize fields with content from old blog
    function initBlog() {
        if (router.query.slug) {

            setValues({ ...values, loading: true });

            // get the old blog
            singleBlog(router.query.slug).then((data) => {
                if (data.error) {
                    //console.log(data.error);
                    setValues({ ...values, error: data.error, loading: false });
                }
                else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setOldCheckedTag(data.tags);
                }

            })
        }
    }


    function initTags() {
        getTags().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            }
            else {
                setTags(data);
            }
        })
    }


    function findOutCheckedTag(tag) {
        const result = checkedTag.indexOf(tag);
        if (result !== -1) {
            return true;
        }
        else {
            return false;
        }
    }


    function showTags() {
        function createLi(tag, index) {
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


    function handleToggleTag(tagId) {
        return () => {
            setValues({ ...values, error: "" });

            const clickedTag = checkedTag.indexOf(tagId);  //return -1 if not in array, else index of array

            const all = [...checkedTag];
            if (clickedTag === -1) {
                all.push(tagId);
            }
            else {
                all.splice(clickedTag, 1);
            }

            //console.log(all);
            setCheckedTag(all);
            formData.set("tags", all)
        }
    }


    function handleChange(name) {
        return (event) => {
            let value;
            if (name === 'photo') {
                value = event.target.files[0];

                const fileSize = value.size / 1024 / 1024;

                if (fileSize > 1) {
                    toast.dismiss();
                    toast.error("Image size should be less than 1MB");
                }
                else {
                    formData.set(name, value);
                    setValues({ ...values, photoName: value ? value.name : '', [name]: value, formData, error: '' });
                }

            }
            else {
                value = event.target.value;
                formData.set(name, value);
                setValues({ ...values, [name]: value, formData, error: "", loading: false, success: false });
            }
        }
    }


    function handleBody(event) {
        setBody(event);
        formData.set('body', event);
    }


    function editBlog(event) {
        event.preventDefault();

        if(checkedTag.length > 5 ){
            toast.dismiss();
            toast.error("Maximum Tags exceeded!");
            return;
        }

        setValues({ ...values, loading: true, error: false, success: false });

        updateBlog(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            }
            else {
                setValues({
                    ...values,
                    title: '',
                    success: `Blog titled "${data.title}" is successfully updated`,
                    loading: false,
                    error: false
                });

                Router.push(`/blogs/[slug]`, `/blogs/${router.query.slug}`);
            }

        });
    }


    function updateBlogForm() {
        return (
            <form onSubmit={editBlog}>

                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange("title")} />
                </div>

                <div className="form-group">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Write blog content..."
                        onChange={handleBody}
                    />
                </div>

                {/* show publish button */}
                <button type="submit" className="btn btn-success btn-lg" disabled={success || loading}>Update</button>
            </form>
        )
    }


    return (
        <React.Fragment>
            <ToastContainer />

            <div>
                {toast.dismiss()}
                {error && toast.error(error)}
                {loading && <FullPageLoader />}
            </div>

            <div className="container-fluid pb-5">
                <div className="row">

                    {/* show blog form */}
                    <div className="col-md-8">
                        {updateBlogForm()}
                    </div>

                    {/* show upload image, tags */}
                    <div className="col-md-4 pt-4">

                        {/* shows the featured image */}
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

                        {/* shows the tags */}
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