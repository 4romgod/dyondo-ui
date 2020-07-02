import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Author from "../../Author/Author";
import { API } from "../../../config";

import cardStyle from "./cardStyle.js";

function Card({ blog }) {
    
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
        <div className="pb-3 pl-3 pr-3 mb-4 bg-white shadow container-card animate__animated animate__fadeIn">
            <style jsx global>
                {cardStyle}
            </style>

            {/** holds all the content */}
            <div className="row">

                {/** holds the image */}
                <div className="col-sm-4 mt-3 pl-0 pr-0" id="container-featured-img">
                    <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                        <a>
                            <p
                                style={{
                                    backgroundImage: `url(${API}/blog/photo/${blog.slug})`
                                }}
                            >
                            </p>
                        </a>
                    </Link>
                </div>

                <div className="col-sm-8" id="container-blog-meta">
                    {/** holds the title */}
                    <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                        <a style={{ cursor: 'pointer', color: 'rgb(41,41,41)' }}>
                            <h3 className="pt-3 font-weight-bold">
                                {blog.title}
                            </h3>
                        </a>
                    </Link>

                    {/** holds the author and date */}
                    <section className="mt-3 mb-3">
                        <Author blog={blog} />
                    </section>

                    {/* <section className="width-overflow container-excerpt">
                        {renderHTML(blog.excerpt)}
                    </section> */}

                    <div id="container-cat-tag">
                        {showBlogTags()}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Card;