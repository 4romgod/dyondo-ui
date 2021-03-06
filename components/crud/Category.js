import React, { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Category() {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    });

    const { name, error, success, categories, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        getCategories().then(function (data) {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setValues({ ...values, categories: data });
            }
        });
    }, [reload]);

    function showCategories() {
        return categories.map(function (cat, index) {
            return (
                <button
                    key={index}
                    onDoubleClick={() => deleteConfirm(cat.slug)}
                    title="Double click to delete"
                    className="btn btn-outline-info btn-sq mr-1 ml-1 mt-3"
                >
                    {cat.name}
                </button>)
        });
    }

    function deleteConfirm(slug) {
        let answer = window.confirm("Are you sure you want to delete this category?");
        if (answer) {
            removeCategory(slug, token).then(function (data) {
                if (data.error) {
                    toast.dismiss();
                    toast.error(data.error);
                }
                else {
                    toast.dismiss();
                    toast.success(`${slug} successfully deleted!`);
                    setValues({ ...values, error: false, success: false, name: '', removed: true, reload: !reload });
                }
            });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        create({ name }, token).then(function (data) {
            if (data.error) {
                toast.dismiss();
                toast.error(`${name} already exists!`);
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

    function newCategoryForm() {
        return (
            <form onSubmit={handleSubmit}>
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
                {newCategoryForm()}
                {showCategories()}
            </div>
        </React.Fragment>
    )
}

export default Category;
