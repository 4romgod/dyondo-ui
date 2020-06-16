import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Author from "../../Author/Author";
import { API } from "../../../config";
import "./card.css";

function Card({ blog }) {

    function showBlogCategories() {
        function showCat(cat, index) {
            return (
                <Link key={index} href={`/categories/[slug]`} as={`/categories/${cat.slug}`}>
                    <a className="btn btn-outline-info btn-sm ml-1 mr-1 mt-3">{cat.name}</a>
                </Link>
            )
        }
        return blog.categories.map(showCat);
    }

    function showBlogTags() {
        function showTag(tag, index) {
            return (
                <Link key={index} href={`/tags/[slug]`} as={`/tags/${tag.slug}`}>
                    <a className="btn btn-outline-info btn-sm ml-1 mr-1 mt-3">#{tag.name}</a>
                </Link>
            )
        }
        return blog.tags.map(showTag);
    }


    return (
        <div className="pb-3 pl-3 pr-3 mb-4 bg-white shadow container-card">

            {/** holds all the content */}
            <div className="row">

                {/** holds the image */}
                <div className="col-sm-3 pl-0 pr-0 mt-3 container-image">
                    <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                        <a>
                            <p
                                style={{
                                    backgroundImage: `url(${API}/blog/photo/${blog.slug})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    height: '200px',
                                    width: '100%',
                                    margin: '0',
                                    borderRadius: '3px'
                                }}
                            >
                            </p>

                        </a>
                    </Link>
                </div>

                <div className="col-sm-9">
                    {/** holds the title */}
                    <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                        <a style={{ cursor: 'pointer' }}>
                            <h2 className="pt-3 font-weight-bold width-overflow">
                                {blog.title}
                            </h2>
                        </a>
                    </Link>

                    {/** holds the author and date */}
                    <section className="mt-3 mb-3">
                        <Author blog={blog} />
                    </section>

                    {/* <section className="width-overflow container-excerpt">
                        {renderHTML(blog.excerpt)}
                    </section> */}

                    {showBlogCategories()}
                    {showBlogTags()}

                </div>

            </div>

        </div>
    )
}

export default Card;