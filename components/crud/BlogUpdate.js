import Link from "next/link"
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from 'next/router';
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";
import { QuillFormats, QuillModules } from '../../helpers/quill';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function BlogUpdate({ router }) {

    // holds the list of cats and tags
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    // holds the list of checked cats and tags
    const [checkedCat, setCheckedCat] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]);

    const [body, setBody] = useState('');

    const [values, setValues] = useState({
        title: '',
        error: "",
        success: "",
        formData: "",
        title: "",
        body: '',
        photoName: ''
    });

    const { error, success, formData, title, blog, photoName } = values;
    const token = getCookie('token');


    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initBlog();
        initCategories();
        initTags();
    }, [router]);


    // sets all the categories that were checked before
    function setOldCheckedCat(oldCats) {
        let catList = [];
        oldCats.map((cat, index) => {
            catList.push(cat._id);
        });
        setCheckedCat(catList);
    }

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

            // get the old blog
            singleBlog(router.query.slug).then((data) => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setOldCheckedCat(data.categories);
                    setOldCheckedTag(data.tags);
                }

            })
        }
    }

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


    // finds out if a category is already checked
    function findOutCheckedCat(cat) {
        const result = checkedCat.indexOf(cat);
        if (result !== -1) {
            return true;
        }
        else {
            return false;
        }
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

    function showCategories() {
        function createLi(cat, index) {
            return (
                <li key={index} className="list-unstyled">
                    <label for={cat.name} className="checkboxContainer">{cat.name}
                        <input
                            onChange={handleToggleCat(cat._id)}
                            checked={findOutCheckedCat(cat._id)}
                            type="checkbox"
                            id={cat.name}
                            name={cat.name}
                        />
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
                    <label for={tag.name} className="checkboxContainer">{tag.name}
                        <input
                            onChange={handleToggleTag(tag._id)}
                            checked={findOutCheckedTag(tag._id)}
                            type="checkbox"
                            id={tag.name}
                            name={tag.name}
                        />
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
                formData.set(name, value);
                setValues({ ...values, photoName: value ? value.name : '', [name]: value, formData, error: '' });
            }
            else {
                value = event.target.value;
                formData.set(name, value);
                setValues({ ...values, [name]: value, formData, error: "" });
            }
        }
    }


    function handleBody(event) {
        setBody(event);
        formData.set('body', event);
    }


    function editBlog(event) {
        event.preventDefault();
        updateBlog(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            }
            else {
                setValues({
                    ...values,
                    title: '',
                    success: `Blog titled "${data.title}" is successfully updated`
                });

                setTimeout(() => Router.push(`/blogs/${router.query.slug}`), 2000);
            }

        });
    }


    function updateBlogForm() {
        return (
            <form onSubmit={editBlog}>
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
                <button type="submit" className="btn btn-success btn-lg">Update</button>
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
                        {updateBlogForm()}
                    </div>

                    {/* show upload image, tags and categories */}
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

export default withRouter(BlogUpdate);