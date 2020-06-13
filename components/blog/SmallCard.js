import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from "../../config";


function SmallCard({ blog }) {

    return (
        <div className="card mb-5 shadow">

            <section>
                <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                    <a>
                        <img
                            className="img img-fluid"
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={`${blog.title}`}
                            style={{
                                maxHeight: '250px',
                                width: '100%',
                                cursor: 'pointer',
                                borderRadius: '3px'
                            }}
                        />
                    </a>
                </Link>
            </section>

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

        </div>

    );
}

export default SmallCard;