import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Tag() {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    const { name, error, success, tags, removed, reload } = values;
    const token = getCookie('token');

    //const controller = new AbortController();

    // load categories onStart
    useEffect(function () {
        loadTags();

        // return function cleanup(){
        //     controller.abort();
        // }
    }, [reload]);


    function loadTags() {
        getTags().then(function (data) {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setValues({ ...values, tags: data });
            }
        });
    }


    function showTags() {
        return tags.map(function (tag, index) {
            return (
                <button
                    key={index}
                    onDoubleClick={() => deleteConfirm(tag.slug)}    // arrow func for passing slug
                    title="Double click to delete"
                    className="btn btn-outline-info btn-sq mr-1 ml-1 mt-3"
                >
                    {tag.name}
                </button>)
        });
    }


    function deleteConfirm(slug) {
        let answer = window.confirm("Are you sure you want to delete this tag?");
        if (answer) {
            deleteTag(slug);
        }
    }

    function deleteTag(slug) {
        //console.log(`Delete ${slug}`);
        removeTag(slug, token).then(function (data) {
            if (data.error) {
                console.log(data.error);

                toast.dismiss();
                toast.error("Something went wrong while deleting!");
            }
            else {
                toast.dismiss();
                toast.success(`${slug} successfully deleted!`);
                setValues({ ...values, error: false, success: false, name: '', removed: true, reload: !reload });
            }
        })
    }


    function clickSubmit(event) {
        event.preventDefault();
        //console.log('create tag', name);

        // post requst to the backend api
        create({ name }, token).then(function (data) {
            if (data.error) {
                toast.dismiss();
                toast.error("Something went wrong while creating!");
                
                setValues({ ...values, error: data.error, success: false });
            }
            else {
                toast.dismiss();
                toast.success(`${name} successfully created!`);
                setValues({ ...values, error: false, success: true, name: "", removed: false, reload: !reload });
            }
        });

    }


    function handleChange(event) {
        setValues({ ...values, name: event.target.value, error: false, success: false, removed: '' });
    }


    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    function newTagForm() {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} required />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary mb-3">Create</button>
                </div>

            </form>
        )
    };


    return (
        <React.Fragment>

            <ToastContainer />

            <div onMouseMove={mouseMoveHandler}>
                {newTagForm()}
                {showTags()}
            </div>
        </React.Fragment>)

}

export default Tag;
