import React, { useState, useEffect } from "react";
import { getCookie } from "../../../actions/auth";
import { withRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import FullPageLoader from "../../Loader/FullPageLoader";
import Checkbox from "../../Checkbox/Checkbox";
import { dyondoClient } from "../../../helpers/utils";

const TagUpdate = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        photo: '',
        photoName: '',
        allTags: [],
        tag: ''
    });

    const [results, setResults] = useState({
        error: false,
        success: false,
        loading: false,
        reload: false
    });

    const [topics, setTopics] = useState([]);
    const [checkedTopics, setCheckedTopic] = useState([]);

    const { name, photo, photoName, allTags, tag } = values;
    const { error, success, loading, reload } = results;

    const token = getCookie('token');

    useEffect(() => {
        initTags();
        initTopics();
    }, [reload]);


    const initTags = async () => {
        try {
            setResults({...results, loading: true})
            const result = await dyondoClient.getRetrieveTags();
            setValues({ ...values, allTags: result.data });
            setResults({...results, loading: false})
        } catch (error) {
            console.log(error);
            toast.dismiss();
            toast.error("Something went wrong while loading Topics");
        }
    }

    const initTopics = async () => {
        try {
            setResults({...results, loading: true})
            const result = await dyondoClient.getRetrieveTopics();
            setTopics(result.data);
            setResults({...results, loading: false})
        } catch (error) {
            console.log(error);
            toast.dismiss();
            toast.error("Something went wrong while loading Topics");
        }
    }

    const showTags = () => {
        return allTags.map((tag, index) => {
            return (
                <button
                    key={index}
                    onDoubleClick={() => populateTag(tag)}
                    title="Double click to Update"
                    className="btn btn-outline-info btn-sq mr-1 ml-1 mt-3"
                >
                    {tag.name}
                </button>)
        });
    }

    const populateTag = (tag) => {
        setValues({ ...values, name: tag.name, tag: tag });
        setCheckedTopic(tag.topics);
    }

    const showTopics = () => {
        const createLi = (topic, index) => {
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
                    setValues({ ...values, photoName: value ? value.name : '', [name]: value });
                    setResults({ ...results, error: false, success: false, removed: '' });
                }
            } else {
                value = event.target.value;
                setValues({ ...values, [name]: event.target.value });
                setResults({ ...results, error: false, success: false, removed: '' });
            }
        }
    }

    const handleToggleTopic = (topicId) => {
        return () => {
            setResults({ ...results, error: "" });

            const clickedTopic = checkedTopics.indexOf(topicId);
            const all = [...checkedTopics];
            if (clickedTopic === -1) {
                all.push(topicId);
            } else {
                all.splice(clickedTopic, 1);
            }
            setCheckedTopic(all);
        }
    }

    const findOutCheckedTopic = (topic) => {
        const result = checkedTopics.indexOf(topic);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    }

    const clickSubmit = async (event) => {
        event.preventDefault();
        const answer = window.confirm("Are you sure you want to update this tag?");
        if (answer) {
            try {
                setResults({...results, loading: true})
                const authHeaders = { Authorization: `Bearer ${token}` };
                const tagBody = { name, topics: checkedTopics };
                await dyondoClient.putUpdateTag({ slug: tag.slug, body: tagBody }, { headers: authHeaders });
                toast.dismiss();
                toast.success(`${tag.slug} successfully updated!`);
                setValues({ ...values, success: false, name: "" });
                setResults({ ...results, error: false, loading: false, reload: !reload })
            } catch (error) {
                console.log(error);
                toast.dismiss();
                toast.error("Something went wrong while updating Tag");
            }
        }
    }

    const mouseMoveHandler = e => {
        setResults({ ...results, error: false, success: false, removed: '' });
    };

    const newTagForm = () => {
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
                    <button type="submit" className="btn btn-primary btn-block mb-4">Update Tag</button>
                </div>
            </form>
        )
    };

    return (
        <React.Fragment>
            <ToastContainer />

            <div>
                {loading && <FullPageLoader />}
            </div>

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
                            {showTopics()}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>)
}

export default withRouter(TagUpdate);
