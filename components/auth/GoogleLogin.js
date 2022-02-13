import Router from 'next/router';
import { loginWithGoogle, authenticate, isAuth } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from '../../config';
import { GoogleLogin } from "react-google-login";

function LoginGoogle(props) {

    function responseGoogle(response) {
        const tokenId = response.tokenId;
        const user = { tokenId };

        loginWithGoogle(user)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    authenticate(data, () => {
                        if (isAuth() && (isAuth().role === 1)) {
                            Router.push(`/admin`);
                        } else {
                            Router.push(`/user`);
                        }
                    });
                }
            });
    }

    return (
        <div className="pb-3">
            <GoogleLogin
                disabled={false}
                clientId={`${GOOGLE_CLIENT_ID}`}
                buttonText={props.btnText}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme={'dark'}
            />
        </div>
    );
}

export default LoginGoogle;