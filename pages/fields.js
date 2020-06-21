import Link from "next/link"
import { useState, useEffect } from "react";
import { list } from "../actions/field";
import moment from "moment";

import FullPageLoader from "../components/Loader/FullPageLoader";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Fields() {

    const [values, setValues] = useState({
        fields: [],

        error: false,
        success: false,
        loading: false
    });


    const {fields, error, success, loading} = values;

    useEffect(() => {
        loadFields();
    }, []);


    function loadFields() {
        list().then((data) => {
            console.log(data);
            
            if (data.error) {
                console.log(data.error);
            }
            else {
                setValues({...values, fields: data});                
            }
        });
    }


    function showAllFields() {
        function showField(field, index) {
            return (
                <div key={index} className="pb-5">
                    <h3>{field.name}</h3>
                </div>
            )
        }

        return fields && fields.map(showField);
    }

    return (
        <React.Fragment>

            <ToastContainer />

            {loading && <FullPageLoader />}

            <div className="row">
                <div className="col-md-12">
                    {showAllFields()}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Fields;