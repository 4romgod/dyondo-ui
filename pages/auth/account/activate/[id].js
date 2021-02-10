import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import { signup } from "../../../../actions/auth";
import jwt from 'jsonwebtoken';

function ActivateAccount({ query }) {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        success: false,
        loading: false,
        showButton: true
    });

    const { name, token, error, success, loading, showButton } = values;

    useEffect(() => {
        let token = query.id;
        if (token) {
            const { name } = jwt.decode(token);
            setValues({ ...values, name, token });
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        setValues({ ...values, loading: true, error: false });

        signup({ token })
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false, showButton: false });
                }
                else {
                    setValues({ ...values, error: false, loading: false, showButton: false, success: true });
                }
            });
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
                You have successfully activated your account. Please signin.
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
                Activating Your New Account...
            </div>);
    };

    return (
        <Layout>
            <div className="bg-white">
                <div className="container pt-5 pb-5 mb-5">
                    <h3 className="text-center pb-3">Hey {name}, Ready to activate your account</h3>
                    {showLoading()}
                    {error && showError()}
                    {success && showSuccess()}

                    <div className="container text-center">
                        {showButton &&
                            <button className="btn btn-outline-info btn-lg mb-5" onClick={handleSubmit}>
                                Activate Account
                            </button>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

ActivateAccount.getInitialProps = ({ query }) => {
    return { query };
}

export default ActivateAccount;


