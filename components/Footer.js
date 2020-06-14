import Link from "next/link";

function Footer() {

    return (
        <React.Fragment>
            <footer>
                <div className="footer-one">
                    <div className="row ml-0 mr-0">
                        <ul className="footer-links col-md-12">
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