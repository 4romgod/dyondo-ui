import Link from "next/link";
import "./footer.css";
import { DOMAIN, APP_NAME } from "../../config";


function Footer() {

    return (
        <React.Fragment>
            <footer>
                <div className="footer-one">
                    <div className="row ml-0 mr-0">

                        <div className="col-md-4 footer-contact-container">
                            <div className="item one" style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <img
                                        className="footer-icon"
                                        src="/images/blog.png"
                                        alt="azblogs logo"
                                    />
                                </div>
                                <div>
                                    <Link href={`/`} as={`/`}>
                                        <p className="pl-2">
                                            <a style={{ cursor: 'pointer' }}>
                                                {`${DOMAIN}`}
                                            </a>
                                        </p>
                                    </Link>
                                </div>
                            </div>

                            <div className="item two" style={{ display: 'flex' }}>
                                <div>
                                    <img
                                        className="footer-icon"
                                        src="/images/email.png"
                                        alt="email icon"
                                    />
                                </div>
                                <div>
                                    <p className="pl-2"><a>azblogs365@gmail.com</a></p>
                                </div>
                            </div>

                            <div className="item three" style={{ display: 'flex' }}>
                                <div>
                                    <img
                                        className="footer-icon"
                                        src="/images/saflag.jpg"
                                        alt="phone icon"
                                    />
                                </div>
                                <div>
                                    <p className="pl-2"><a>+27(0) 63 289 9004</a></p>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-4">
                            <ul className="footer-links">
                                <li>
                                    <Link href={`/newsletter`}>
                                        <a>Newsletter</a>
                                    </Link>
                                </li>

                                <li>
                                    <Link href={`/contact`}>
                                        <a>Contact </a>
                                    </Link>
                                </li>

                            </ul>
                        </div>

                        <div className="col-md-4">
                            <ul className="footer-links">
                                <li>
                                    <Link href={`/privacyPolicy`}>
                                        <a>Privacy Policy</a>
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>

                <div className="footer-two text-center">
                    <p>
                        Copyright &#169; {`${APP_NAME} ${new Date().getFullYear()}`}
                    </p>
                </div>
                
            </footer>
        </React.Fragment>
    )
}

export default Footer;