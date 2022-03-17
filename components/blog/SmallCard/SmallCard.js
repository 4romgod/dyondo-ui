import Link from 'next/link';
import { API } from "../../../config";
import Author from "../../Author/Author";

function SmallCard({ blog }) {
    return (
        <div className="card mb-5 shadow animate__animated animate__fadeIn">
            <div className="row ml-0 mr-0">

                <section className="col-sm-5 col-md-12 pl-0 pr-0">
                    <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                        <a>
                            <p
                                style={{
                                    backgroundImage: `url(${API}/blogs/photo/${blog.slug})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: '100% 100%',
                                    backgroundRepeat: 'no-repeat',
                                    height: '250px',
                                    width: '100%',
                                    margin: '0'
                                }}
                            >
                            </p>
                        </a>
                    </Link>
                </section>

                <section className="col-sm-7 col-md-12 pl-0 pr-0">
                    <div className="pl-3 pr-2 pt-3">
                        <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                            <a style={{color: 'rgb(41,41,41)'}}>
                                <h4 className="card-title width-overflow">
                                    {blog.title}
                                </h4>
                            </a>
                        </Link>
                    </div>

                    <div className="card-body pl-3 pr-2 pt-0 pb-4">
                        <Author blog={blog} />
                    </div>

                </section>

            </div>

        </div>

    );
}

export default SmallCard;