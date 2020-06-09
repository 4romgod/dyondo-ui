import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from "../../config";
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';


function Search() {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;


    function searchedBlog(results = []) {
        return (
            <div className="jumbotron bg-light">
                {message && <p className="text-muted font-italic">{message}</p>}

                {results.map((blog, index) => {
                    return (
                        <div key={index}>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="text-primary">{blog.title}</a>
                            </Link>
                        </div>
                    )
                })}

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
        })
    }

    function searchForm() {
        return (
            <form onSubmit={searchSubmit} className="container">
                <div className="row">

                    <div className="col-md-10 pb-2">
                        <input
                            type="search"
                            className="form-control bg-light border-0"
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
        <div className="container-fluid pb-2" style={{ marginTop: '80px' }}>
            <div className="row">

                <div className="col-md-12">{searchForm()}</div>

                <div className="container">
                    <div className="col-md-10">
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
    )
}

export default Search;