import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { getTags } from "../../actions/tag";
import Link from "next/link";
import { withRouter } from "next/router";
import moment from "moment";
const baseURL = "https://hn.algolia.com/api/v1/search?query=";

const News = ({ tags }) => {
    const [QUERY, setQuery] = useState("");
    const [URL, setUrl] = useState(`${baseURL}${QUERY}`);
    const [NEWS, setNews] = useState([]);

    useEffect(() => { fetchNews() }, [URL]);

    const fetchNews = () => {
        fetch(URL)
            .then(result => result.json())
            .then(data => data.hits)
            .then(hits => hits.filter((item) => (item.title != null)))
            .then(hits => {
                hits.sort((a, b) => {
                    return (a.created_at <= b.created_at) ? 1 : -1;
                });
                return hits;
            })
            .then(hits => {
                setNews(hits);
            })
            .catch(err => console.log(err));
    }

    const showAllTags = () => {
        const showTag = (tag, index) => {
            return (
                <Link href={`/tags/[slug]`} as={`/tags/${tag.slug}`} key={index}>
                    <a className="btn btn-outline-info btn-sm mr-1 ml-1 mt-3" style={{ maxWidth: "100%", overflowX: "auto" }}>
                        {`#${tag.name}`}
                    </a>
                </Link>
            );
        }
        return tags.map(showTag);
    }

    return (
        <React.Fragment>
            <Layout>
                <div className="bg-white" style={{ marginBottom: "100px" }}>
                    <div className="pb-5">
                        <div className="bg-white">
                            <div className="col-md-12 pl-0 pr-0 text-center width-overflow">
                                <div className="bg-white pt-5 pb-3">
                                    <h1>Best Programming News</h1>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row ml-0 mr-0">
                                {/* <Search closeSearch={isClicked} /> */}
                            </div>
                        </div>

                        <div className="row ml-0 mr-0 mt-5">
                            <div className="col-md-8 pl-4 pr-3">
                                <ul className="list-group">
                                    {NEWS.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="list-group-item btn btn-outline-success pl-4"
                                                style={{
                                                    cursor: 'pointer',
                                                    textAlign: "left",
                                                    color: '#196556'
                                                }}
                                                onClick={() => window.open(item.url)}
                                            >
                                                <div>{item.title}</div>
                                                <small className="text-muted">{moment(item.created_at).fromNow()}</small>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="col-md-4" style={{ height: '100%' }}>
                                <div className="pl-3 pr-3 pt-5 pb-5 bg-white shadow">
                                    <div className="pb-3">
                                        <h4
                                            className="btn btn-info btn-block"
                                            style={{ backgroundColor: "#343a40", border: "none" }}
                                        >
                                            Popular Tags
                                        </h4>
                                        {showAllTags()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}

News.getInitialProps = () => {
    return getTags().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { tags: data };
        }
    });
}

export default withRouter(News);