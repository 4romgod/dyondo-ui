import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from "../../../actions/auth";

function ForgotPassword() {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        loading: '',
        showForm: true
    });

    const { email, message, error, loading, showForm } = values;

    function handleChange(name) {
        return (event) => {
            setValues({ ...values, message: '', error: '', [name]: event.target.value });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setValues({ ...values, message: '', loading: true, error: '' });

        forgotPassword({ email }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            }
            else {
                setValues({ ...values, message: data.message, email: '', showForm: false, loading: false });
            }
        });
    }


    const showMessage = () => {
        return (
            <div className="alert alert-info" style={{ display: message ? '' : 'none' }}>
                {message}
            </div>);
    };

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>);
    };
    
    const showLoading = () => {
        return (
            <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
                Sending Reset Link...
            </div>);
    };


    function passwordForgotForm() {
        return (
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <div className="form-group pt-5">
                        <input
                            onChange={handleChange('email')}
                            type="email"
                            className="form-control"
                            value={email}
                            placeholder="Type your email"
                            required
                        />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-danger">Send Password reset link</button>
                    </div>

                </form>
            </div>
        )
    }

    return (
        <Layout>
            <div className="container pt-5">
                <h2>Forgot password</h2>
                <hr />
                {showError()}
                {showLoading()}
                {showMessage()}
                {showForm && passwordForgotForm()}
            </div>
        </Layout>
    )

}

export default ForgotPassword;