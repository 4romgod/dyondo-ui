import React, { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../../actions/auth';
import { create, getTags, removeTag, updateTag } from '../../actions/tag';
import { withRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from "../Checkbox/Checkbox";
import { dyondoClient } from "../../helpers/utils";

function Tag() {
    const [values, setValues] = useState({
        name: '',
        photo: '',
        photoName: '',
        tags: [],
    });

    const [results, setResults] = useState({
        error: false,
        success: false,
        removed: false,
        reload: false
    });

    const [topics, setTopics] = useState([]);
    const [checkedTopics, setCheckedTopic] = useState([]);

    const { name, photo, photoName, tags } = values;
    const { error, success, removed, reload } = results;

    const token = getCookie('token');

    useEffect(() => {
        loadTags();
        initTopics();
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

    function initTopics() {
        dyondoClient.getRetrieveTopics()
            .then((response) => {
                if (response.error) {
                    setResults({ ...results, error: response.error });
                } else {
                    setTopics(response.data);
                }
            });
    }

    function showTopics() {
        function createLi(topic, index) {
            return (
                <li key={index} className="list-unstyled">
                    <Checkbox
                        entity={topic}
                        handleChange={handleToggleTopic}
                        handleChecked={findOutCheckedTopic}
                    />
                </li>
            )
        }
        return (topics && topics.map(createLi));
    }

    function showTags() {
        return tags.map(function (tag, index) {
            return (
                <button
                    key={index}
                    onDoubleClick={() => deleteConfirm(tag.slug)}
                    title="Double click to delete"
                    className="btn btn-outline-info btn-sq mr-1 ml-1 mt-3"
                >
                    {tag.name}
                </button>)
        });
    }

    function deleteConfirm(slug) {
        console.log("You want to delete?");
        let answer = window.confirm("Are you sure you want to delete this tag?");
        console.log("Yes i want to delete");

        if (answer) {
            console.log("Deleting the tag...");

            deleteTag(slug);
        }
    }

    function deleteTag(slug) {
        console.log(`Calling API for DeleteTag ${slug}`);
        removeTag(slug, token).then(function (data) {
            console.log("API response: ");
            console.log(data);

            if (data.error) {
                toast.dismiss();
                toast.error("Something went wrong while deleting!");
            }
            else {
                toast.dismiss();
                toast.success(`${slug} successfully deleted!`);
                setValues({ ...values, success: false, name: '' });
                setResults({ ...results, error: false, removed: true, reload: !reload })
            }
        });
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
                    setValues({ ...values, photoName: value ? value.name : '', [name]: value });
                    setResults({ ...results, error: false, success: false, removed: '' });
                }
            }
            else {
                value = event.target.value;

                setValues({ ...values, [name]: event.target.value });
                setResults({ ...results, error: false, success: false, removed: '' });
            }
        }
    }

    function handleToggleTopic(topicId) {
        return () => {
            setResults({ ...results, error: "" });

            const clickedTopic = checkedTopics.indexOf(topicId);

            const all = [...checkedTopics];
            if (clickedTopic === -1) {
                all.push(topicId);
            }
            else {
                all.splice(clickedTopic, 1);
            }

            setCheckedTopic(all);
        }
    }

    function findOutCheckedTopic(topic) {
        const result = checkedTopics.indexOf(topic);
        if (result !== -1) {
            return true;
        }
        else {
            return false;
        }
    }

    function clickSubmit(event) {
        event.preventDefault();

        console.log("submitting data");

        create({ name, topics: checkedTopics }, token).then(function (data) {
            if (data.error) {
                toast.dismiss();
                toast.error(data.error);
                setResults({ ...results, error: data.error, success: false });
            }
            else {
                toast.dismiss();
                toast.success(`${name} successfully created!`);

                setValues({ ...values, name: "", photo: '', photoName: '', tags });

                setResults({ ...results, error: false, success: true, removed: false, reload: !reload });

                setCheckedTopic([]);
            }
        });
    }

    const mouseMoveHandler = e => {
        setResults({ ...results, error: false, success: false, removed: '' });
    };

    function newTagForm() {
        return (
            <form onSubmit={clickSubmit}>
                <div>
                    <small className="text-muted">Max size: 1MB</small><br />
                    <label className="btn btn-outline-info">
                        Upload featured image
                        <input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
                    </label>
                    <small className="text-muted">{photoName}</small>
                </div>

                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange('name')} value={name} required />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Create Tag</button>
                </div>

            </form>
        )
    };

    return (
        <React.Fragment>
            <ToastContainer />

            <div className="row ml-0 mr-0">

                <div className="col-md-12 text-center">
                    {showTags()}
                </div>

                <div className="col-md-12 shadow mt-5">
                    <div className="row ml-0 mr-0 pt-5 pb-5">

                        <div className="col-md-1"></div>

                        <div className="col-md-6 pl-0 pr-0">
                            <div onMouseMove={mouseMoveHandler}>
                                {newTagForm()}
                            </div>
                        </div>


                        <div className="col-md-1"></div>

                        <div className="col-md-4 pl-0 pr-0">
                            <h4 className='mb-3'>Select some Topics</h4>
                            {showTopics()}
                        </div>

                    </div>
                </div>

            </div>

        </React.Fragment>)
}

export default withRouter(Tag);