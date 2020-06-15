import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from "../../../config";

import "./smallcard.css";


function SmallCard({ blog }) {

    return (
        <div className="card mb-5 shadow">
            <div className="row ml-0 mr-0">

                <section className="col-sm-5 col-md-12 pl-0 pr-0">
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

                <section className="col-sm-7 col-md-12 pl-0 pr-0">
                    <div className="pl-3 pr-2 pt-3">
                        <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                            <a>
                                <h4 className="card-title">
                                    {blog.title}
                                </h4>
                            </a>
                        </Link>
                    </div>

                    <div className="card-body pl-3 pr-2 pt-0 pb-4" style={{ display: 'flex' }}>
                        <small>
                            Posted {moment(blog.updatedAt).fromNow()} by{' '}
                            <Link href={`/profile/[username]`} as={`/profile/${blog.author.username}`}>
                                <a>{blog.author.username}</a>
                            </Link>
                        </small>
                    </div>

                </section>

            </div>

        </div>

    );
}

export default SmallCard;