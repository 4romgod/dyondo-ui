import Link from 'next/link';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { dyondoClient } from "../../helpers/utils";

const Search = (props) => {
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

    const searchedBlog = (results = []) => {
        return (
            <div className="row ml-0 mr-0">

                <div className="col-md-1"></div>

                <div className="col-md-10 pl-0 pr-0">
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
                
                <div className="col-md-1"></div>

            </div>
        )
    }

    const handleChange = (event) => {
        setValues({ ...values, search: event.target.value, searched: false, results: [] });
    }

    const searchSubmit = async (event) => {
        event.preventDefault();

        try {
            const searchedData = await dyondoClient.getRetrieveBlogs({search});
            setValues({ ...values, results: searchedData.data, searched: true, message: `${searchedData.data.length} blogs found` });
        } catch(err) {
            setValues({ ...values, searched: true, message: `Could not perform search` });
        }
    }

    const searchForm = () => {
        return (
            <form onSubmit={async (event) => await searchSubmit(event)} className="">
                <div className="row ml-0 mr-0">

                    <div className="col-md-1"></div>
                    <div className="col-md-10 input-group md-form form-sm form-2 pb-2 pl-0 pr-0 ">
                        <input
                            type="search"
                            className="form-control bg-light"
                            placeholder="Search blogs"
                            onChange={handleChange}
                        />

                        <div className="input-group-append" onClick={async (event) => await searchSubmit(event)}>
                            <span className="input-group-text lime lighten-2" id="basic-text1" >
                                <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
                            </span>
                        </div>

                    </div>
                    <div className="col-md-1"></div>

                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-12 pl-0 pr-0">{searchForm()}</div>

                <div className="col-md-12">
                    {searched && <div>{searchedBlog(results)}</div>}
                </div>

            </div>
        </div>
    )
}

export default Search;