import { useState } from 'react';
import Layout from '../../../../components/Layout';
import { resetPassword } from "../../../../actions/auth";
import { withRouter } from 'next/router';


function ResetPassword({ router }) {
    const [values, setValues] = useState({
        email: '',
        newPassword: '',
        message: '',
        error: '',
        loading: '',
        showForm: true
    });

    const { email, message, error, loading, showForm, newPassword } = values;

    function handleSubmit(event) {
        event.preventDefault();

        resetPassword({ newPassword, resetPasswordLink: router.query.id })
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false, message: false });
                }
                else {
                    setValues({ ...values, message: data.message, email: '', showForm: false, error: false, loading: false });
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
            <div className="alert alert-danger" style={{ display: loading ? '' : 'none' }}>
                Reseting Password...
            </div>);
    };


    function passwordResetForm() {
        return (
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <div className="form-group pt-5">
                        <input
                            onChange={event => setValues({...values, newPassword:event.target.value})}
                            type="password"
                            className="form-control"
                            value={newPassword}
                            placeholder="Type your new password"
                            required
                        />
                    </div>

                    <div className='pb-5'>
                        <button type="submit" className="btn btn-danger">Change Password</button>
                    </div>

                </form>
            </div>
        )
    }


    return (
        <Layout>
            <div className="container pt-5 pb-5">
                <h2>Forgot password</h2>
                <hr />
                {showError()}
                {showLoading()}
                {showMessage()}
                {showForm && passwordResetForm()}
            </div>
        </Layout>
    )

}

export default withRouter(ResetPassword);