import { useState } from 'react';
import { sendNodemailer } from '../actions/contact';

function Form({ authorEmail }) {
    const [values, setValues] = useState({
        buttonText: 'Send Message',
        name: '',
        email: '',
        message: ''
    });

    const [result, setResult] = useState({
        message: '',
        success: false,
        error: false,
        loading: false,
        showForm: true
    });

    const { name, email, message } = values;
    const { error, success, loading, showForm} = result;


    function handleChange(name) {
        return (event) => {
            // console.log(name + ": " + event.target.value);
            setValues({ ...values, [name]: event.target.value, error: false, success: false, loading: false });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        //console.log(values);

        setValues({ ...values, loading: true, error: false, success: false });

        sendNodemailer({email, name, message})
            .then(response=>{
                console.log(response);
            })


        /** 
        sendMessage({ authorEmail, name, email, message })
            .then((data) => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        success: false,
                        loading: false
                    });
                }
                else {
                    setValues({
                        ...values,
                        success: "Message sent successfully!",
                        error: false,
                        loading: false,
                        message: '',
                        name: '',
                        email: '',
                        showForm: false
                    });
                }
            });
        */
    }


    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
                Message sent successfully!
            </div>);
    };

    const showLoading = () => {
        return (
            <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
                Sending message...
            </div>);
    };

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>);
    };


    function showContactForm() {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Message</label>
                    <textarea
                        onChange={handleChange('message')}
                        type="text"
                        className="form-control"
                        value={message}
                        required
                        rows="6"
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Your Name</label>
                    <input
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        required
                        value={name}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Your Email</label>
                    <input
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        required
                        value={email}
                    />
                </div>

                <div>
                    <button className="btn btn-success">Send Message</button>
                </div>
            </form>
        )
    }

    return (
        <div>
            {showError()}
            {showSuccess()}
            {showLoading()}
            {showForm && showContactForm()}
        </div>

    )
}

export default Form;