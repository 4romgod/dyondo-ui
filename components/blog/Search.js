import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from "../../config";
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';

function Search(props) {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    useEffect(() => {
        if (searched) {
            setValues({ ...values, searched: props.closeSearch });
        }
    }, [props.closeSearch]);

    function searchedBlog(results = []) {
        return (
            <div className="row ml-0 mr-0">
                <div className="col-md-12 pl-0 pr-0">

                    <div className="jumbotron bg-light pl-0 pr-0 pt-3 pb-0">
                        {message && <p className="text-muted font-italic text-center">{message}</p>}

                        {results.map((blog, index) => {
                            return (
                                <div key={index}>
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <a
                                            id="search-item"
                                            className="text-primary pl-4 pr-3 pt-2 pb-2"
                                            style={{
                                                display: 'block'
                                            }}
                                        >
                                            {blog.title}
                                        </a>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        )
    }

    function handleChange(event) {
        //console.log(event.target.value);
        setValues({ ...values, search: event.target.value, searched: false, results: [] });
    }

    function searchSubmit(event) {
        event.preventDefault();

        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
        });
    }

    function searchForm() {
        return (
            <form onSubmit={searchSubmit} className="">
                <div className="row ml-0 mr-0">

                    <div className="col-md-10 pb-2 pl-0 pr-0">
                        <input
                            type="search"
                            className="form-control bg-light"
                            placeholder="Search blogs"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-2">
                        <button className="btn btn-block btn-primary" type="submit">Search</button>
                    </div>

                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-12 pl-0 pr-0">{searchForm()}</div>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-10 pl-0 pr-0">
                            {searched
                                &&
                                <div>
                                    {searchedBlog(results)}
                                </div>
                            }
                        </div>

                        <div className="col-md-2"></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Search;