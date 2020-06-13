import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from "../../config";


function Card({ blog }) {

    function showBlogCategories(blog) {
        function showCat(cat, index) {
            return (
                <Link key={index} href={`/categories/${cat.slug}`}>
                    <a className="btn btn-primary ml-1 mr-1 mt-3">{cat.name}</a>
                </Link>
            )
        }
        return blog.categories.map(showCat);
    }

    function showBlogTags(blog) {
        function showTag(tag, index) {
            return (
                <Link key={index} href={`/tags/${tag.slug}`}>
                    <a className="btn btn-outline-primary ml-1 mr-1 mt-3">{tag.name}</a>
                </Link>
            )
        }
        return blog.tags.map(showTag);
    }


    return (

        <div className="pb-4 pl-4 pr-3 mb-4 bg-white shadow">

            {/** holds categories and tags */}
            {/* <section>
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                    <br /><br />
                </section> */}

            {/** holds all the content */}
            <div className="row">

                {/** holds the image */}
                <div className="col-md-3 pt-2 mt-3 container-image">
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                            <img
                                className="img img-fluid"
                                src={`${API}/blog/photo/${blog.slug}`}
                                alt={`${blog.title}`}
                                style={{
                                    maxHeight: 'auto',
                                    width: '100%',
                                    cursor: 'pointer',
                                    borderRadius: '3px'
                                }}
                            />

                        </a>
                    </Link>
                </div>

                <div className="col-md-9">
                    {/** holds the title */}
                    <Link href={`/blogs/${blog.slug}`}>
                        <a style={{ cursor: 'pointer'}}>
                            <h2 className="pt-3 font-weight-bold width-overflow">
                                {blog.title}
                            </h2>
                        </a>
                    </Link>

                    {/** holds the author and date */}
                    <section className="mt-3 mb-3">
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '50px'}}>
                                <img
                                    src={`${API}/user/photo/${blog.author.username}`}
                                    alt={blog.title}
                                    className="img img-fluid featured"
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid #eee'}}
                                />
                            </div>

                            <div className="ml-3 width-overflow">
                                <p>
                                    <Link href={`/profile/${blog.author.username}`}>
                                        <a>{blog.author.username}</a>
                                    </Link>
                                    {' | '}
                                    {moment(blog.updatedAt).fromNow()}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/** holds the excerpt */}
                    <section className="width-overflow">
                        {renderHTML(blog.excerpt)}
                        {/* <Link href={`/blogs/${blog.slug}`}>
                                <a className="btn btn-primary mt-2">Read more</a>
                            </Link> */}
                    </section>

                </div>

            </div>

        </div>
    )
}

export default Card;