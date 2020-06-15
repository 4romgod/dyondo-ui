import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from "../../config";


function SmallCard({ blog }) {

    return (
        <div className="card mb-5 shadow">

            <div className="row ml-0 mr-0">

                <section className="col-sm-6 col-md-12 pl-0 pr-0">
                    <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                        <a>
                            <img
                                className="img img-fluid"
                                src={`${API}/blog/photo/${blog.slug}`}
                                alt={`${blog.title}`}
                                style={{
                                    maxHeight: '300px',
                                    width: '100%',
                                    cursor: 'pointer',
                                    borderRadius: '3px'
                                }}
                            />
                        </a>
                    </Link>
                </section>

                <section className="col-sm-6 col-md-12 pl-0 pr-0">
                    <div className="card-body">
                        <section>
                            <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                                <a><h4 className="card-title">{blog.title}</h4></a>
                            </Link>
                            {/* <div className="card-text">{renderHTML(blog.excerpt)}</div> */}
                        </section>
                    </div>

                    <div className="card-body">
                        Posted {moment(blog.updatedAt).fromNow()} by{' '}
                        <Link href={`/profile/[username]`} as={`/profile/${blog.author.username}`}>
                            <a>{blog.author.username}</a>
                        </Link>
                    </div>
                </section>

            </div>

        </div>

    );
}

export default SmallCard;