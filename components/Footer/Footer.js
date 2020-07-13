import Link from "next/link";
import "./footer.css";
import { DOMAIN, APP_NAME } from "../../config";



function Footer() {

    const topics = [{
        "name": "Programming",
        "slug": "programming",
    },
    {
        "name": "Design",
        "slug": "design"
    },
    {
        "name": "Data Science",
        "slug": "data-science"
    },
    {
        "name": "Networking",
        "slug": "networking"
    },
    {
        "name": "DBMS",
        "slug": "dbms"
    }]

    return (
        <React.Fragment>
            <footer>
                <div className="footer-one text-center">
                    <div className="row ml-0 mr-0">

                        {/* POPULAR TOPICS */}
                        <div className="col-md-3 footer-contact-container">
                            <div>
                                <h4 className="pt-5"><u>Popular Topics</u></h4>
                            </div>

                            <div>
                                {topics.map((topic) => <div>
                                    <Link href={`/tags/topic/[slug]`} as={`/tags/topic/${topic.slug}`}>
                                        <p className="pl-2">
                                            <a style={{ cursor: 'pointer' }}>
                                                {`${topic.name}`}
                                            </a>
                                        </p>
                                    </Link>
                                </div>)}
                            </div>

                        </div>

                        {/* HELP */}
                        <div className="col-md-3">
                            <div>
                                <h4 className="pt-5"><u>Help</u></h4>
                            </div>
                            <ul className="footer-links">
                                <li className="">
                                    <Link href={`/newsletter`}>
                                        <a>Newsletter</a>
                                    </Link>
                                </li>

                                <li className="">
                                    <Link href={`/contact`}>
                                        <a>Contact </a>
                                    </Link>
                                </li>

                            </ul>
                        </div>

                        {/* CONTACT DETAILS */}
                        <div className="col-md-3 footer-contact-container">

                            <div>
                                <h4 className="pt-5"><u>Contact Details</u></h4>
                            </div>

                            <div>
                                <Link href={`/`} as={`/`}>
                                    <p className="pl-2">
                                        <a style={{ cursor: 'pointer' }}>
                                            {`${APP_NAME}`}
                                        </a>
                                    </p>
                                </Link>
                            </div>

                            <div>
                                <p className="pl-2"><a>dyondo.read@gmail.com</a></p>
                            </div>

                            <div>
                                <p className="pl-2"><a>+27(0) 63 289 9004</a></p>
                            </div>

                        </div>

                        {/* OTHER */}
                        <div className="col-md-3">
                            <div>
                                <h4 className="pt-5"><u>Other</u></h4>
                            </div>
                            <ul className="footer-links">
                                <li className="">
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