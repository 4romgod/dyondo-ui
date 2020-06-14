import { useState } from 'react';
import { newsletter } from "../actions/contact";

function Newsletter() {
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        success: '',
        error: '',
        loading: ''
    });

    const { fullname, email, success, error, loading } = values;

    function handleChange(name) {
        return (event) => {
            setValues({ ...values, [name]: event.target.value });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setValues({ ...values, loading: true, success: false, error: false });

        newsletter({ fullname, email }).then(data => {
            if (response.error) {
                setValues({ ...values, error: response.error, loading: false, success: false });
            }
            else {
                setValues({ ...values, error: false, loading: false, success: response.success });
            }
        });

        console.log(success);
        console.log(error);

    }

    return (
        <React.Fragment>
            <div className="newsletter-page">

                <div className="container-newsletter">
                    <div className="container-header text-center">
                        <h3>AZBLOGS NEWSLETTER</h3>
                        <p className="">Programming, Web Development, and Much more</p>
                    </div>

                    <div className="container-form">
                        <div className="text-center">
                            <p>Join the community and receive monthly newsletters as well as exclusive content that will help improve your skills as a developer!</p>
                        </div>

                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        onChange={handleChange('fullname')}
                                        name="fullname"
                                        value={fullname}
                                        type="text"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        onChange={handleChange('email')}
                                        name="email"
                                        value={email}
                                        type="email"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        className="form-control btn btn-success"
                                        type="submit"
                                        placeholder="First Name"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="text-center"
                            style={{ fontSize: '0.8rem' }}
                        >
                            We respect your privacy. Unsubscribe at any time.
                        </div>

                    </div>

                </div>

            </div>
        </React.Fragment>
    )

}

export default Newsletter;