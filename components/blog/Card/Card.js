import Link from 'next/link';
import Author from "../../Author/Author";
import { API } from "../../../config";
import cardStyle from "./cardStyle.js";
import renderHTML from 'react-render-html';

const Card = ({ blog }) => {
    
    const showBlogTags = () => {
        const showTag = (tag, index) => {
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

            <div className="row">
                <div className="col-sm-4 mt-3 pl-0 pr-0" id="container-featured-img">
                    <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                        <a>
                            <p
                                style={{
                                    backgroundImage: `url(${API}/blogs/photo/${blog.slug})`
                                }}
                            >
                            </p>
                        </a>
                    </Link>
                </div>

                <div className="col-sm-8" id="container-blog-meta">
                    <Link href={`/blogs/[slug]`} as={`/blogs/${blog.slug}`}>
                        <a style={{ cursor: 'pointer', color: 'rgb(41,41,41)' }}>
                            <h3 className="pt-3 font-weight-bold">
                                {blog.title}
                            </h3>
                        </a>
                    </Link>

                    <section className="mt-3 mb-3">
                        <Author blog={blog} />
                    </section>

                    <section className="width-overflow container-excerpt">
                        {renderHTML(blog.excerpt)}
                    </section>

                    <div id="container-cat-tag">
                        {showBlogTags()}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Card;