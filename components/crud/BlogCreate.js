import Link from "next/link"
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from 'next/router';
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import { QuillFormats, QuillModules } from '../../helpers/quill';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function CreateBlog({ router }) {

    // gets the blog from the LocalStorage
    function blogFromLS() {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem("blog")) {
            return JSON.parse(localStorage.getItem("blog"))
        } else { return false; }
    }

    // holds the list of cats and tags
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    // holds the list of checked cats and tags
    const [checkedCat, setCheckedCat] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]);

    // holds the state of body content
    const [body, setBody] = useState(blogFromLS());

    const [values, setValues] = useState({
        error: "",
        sizeError: "",
        success: "",
        formData: "",
        title: "",
        hidePublishButton: false,
        photoName: ''
    });


    const { error, sizeError, success, formData, title, hidePublishButton, photoName } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initCategories();
        initTags();
    }, [router]);


    function initCategories() {
        getCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            }
            else {
                setCategories(data);
            }
        })
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


    function showCategories() {
        function createLi(cat, index) {
            return (
                <li key={index} className="list-unstyled">
                    <label className="checkboxContainer">{cat.name}
                        <input onChange={handleToggleCat(cat._id)} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                </li>
            )
        }
        return (categories && categories.map(createLi));
    }

    function showTags() {
        function createLi(tag, index) {
            return (
                <li key={index} className="list-unstyled">
                    <label className="checkboxContainer">{tag.name}
                        <input onChange={handleToggleTag(tag._id)} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                </li>
            )
        }
        return (tags && tags.map(createLi));
    }


    function handleToggleCat(catId) {
        return () => {
            setValues({ ...values, error: "" });

            // 1. look for any cat that is being clicked
            // 1.1. return -1 if value is not already checked
            // 1.2. else get its index
            const clickedCat = checkedCat.indexOf(catId);

            // holds all the checked categories
            const all = [...checkedCat];

            // 2. if the clicked cat was not checked yet, save it
            if (clickedCat === -1) {
                all.push(catId);
            }
            else {
                all.splice(clickedCat, 1);
            }
            //console.log(all);
            setCheckedCat(all);
            formData.set("categories", all)
        }
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

            console.log(all);
            setCheckedTag(all);
            formData.set("tags", all)
        }
    }


    function handleChange(name) {
        return (event) => {
            let value;
            if(name === 'photo'){
                value = event.target.files[0];
                formData.set(name, value);
                setValues({ ...values, photoName: value?value.name:'', [name]: value, formData, error: ''});
            }
            else{
                value = event.target.value;
                formData.set(name, value);
                setValues({ ...values, [name]: value, formData, error: "" });
            }

        }
    }


    // body content resides inside the quill text editor
    function handleBody(event) {
        setBody(event);
        formData.set("body", event);

        if (typeof window != 'undefined') {
            localStorage.setItem('blog', JSON.stringify(event));
        }

    };


    function publishBlog(event) {
        event.preventDefault();
        //console.log("Ready to publish blog");

        createBlog(formData, token).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            }
            else {
                setValues({ ...values, title: "", error: "", success: `A new blog titled "${data.title}" is created` });
                setBody("");
                //setCategories([]);
                //setTags([]);

                localStorage.removeItem('blog');
                setTimeout(()=>Router.push(`/blogs/${router.query.slug}`), 2000);
                
            }
        });
    }


    function createBlogForm() {
        return (
            <form onSubmit={publishBlog}>
                <div>
                    {success && toast.success(success)}
                    {error && toast.error(error)}
                </div>

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
                <button type="submit" className="btn btn-success btn-lg">Publish</button>
            </form>
        )
    }


    return (
        <React.Fragment>
            <ToastContainer />
            <div className="container-fluid pb-5">

                <div className="row">

                    {/* show blog form */}
                    <div className="col-md-8">
                        {createBlogForm()}
                    </div>

                    {/* show upload image, tags and categories */}
                    <div className="col-md-4 pt-4">

                        {/* shows the featured image */}
                        <div className="form-group pb-2">
                            <h4>Featured Image</h4>
                            <hr />

                            <small className="text-muted ml-4">Max size: 1MB</small><br />
                            <label className="btn btn-outline-info  ml-4">
                                Upload featured image
                                <input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
                            </label>
                            <br />
                            <small className="text-muted ml-2">{photoName}</small>

                        </div>

                        {/* shows the categories */}
                        <div>
                            <h4 className="mt-3">Categories</h4>
                            <hr />

                            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                {showCategories()}
                            </ul>
                        </div>

                        {/* shows the tags */}
                        <div>
                            <h4 className="mt-5">Tags</h4>
                            <hr />

                            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                {showTags()}
                            </ul>
                        </div>

                    </div>


                </div>

            </div>
        </React.Fragment>

    )

}


export default withRouter(CreateBlog);