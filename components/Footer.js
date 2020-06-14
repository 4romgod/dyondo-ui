import Link from "next/link";

function Footer() {

    return (
        <React.Fragment>
            <footer>
                <div className="footer-one">
                    <div className="row ml-0 mr-0">
                    
                        <div className="col-md-4 footer-contact-container">
                            <div style={{display: 'flex'}}>
                                <img
                                    className="footer-icon"
                                    src="/images/blog.png"
                                    alt="azblogs logo"
                                />
                                <p className="pl-2"><a>AZBLOGS</a></p>
                            </div>

                            <div style={{display: 'flex'}}>
                                <img
                                    className="footer-icon"
                                    src="/images/email.png"
                                    alt="email icon"
                                />
                                <p className="pl-2"><a>azblogs365@gmail.com</a></p>
                            </div>
                            <div style={{display: 'flex'}}>
                                <img
                                    className="footer-icon"
                                    src="/images/saflag.jpg"
                                    alt="phone icon"
                                />
                                <p className="pl-2"><a>+27(0) 63 289 9004</a></p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <ul className="footer-links">
                                <li>
                                    <Link href={`/privacyPolicy`}>
                                        <a>Privacy Policy</a>
                                    </Link>
                                </li>

                                <li>
                                    <Link href={`/newsletter`}>
                                        <a>Newsletter</a>
                                    </Link>
                                </li>

                                <li>
                                    <Link href={`/contact`}>
                                        <a>Contact</a>
                                    </Link>
                                </li>

                                <li>
                                    <Link href={`/`}>
                                        <a>Hire Me</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-4">
                            
                        </div>
                    </div>
                </div>

                <div className="footer-two text-center">
                    <p>
                        Copyright Azblogs {`${new Date().getFullYear()}`}
                    </p>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;