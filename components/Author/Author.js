import { API } from '../../config';
import Link from "next/link";
import moment from 'moment';

import authorStyle from './authorStyle.js';


function Author({ blog }) {

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>

            <style jsx global>
                {authorStyle}
            </style>

            <div id="container-featured-img">
                <img
                    src={`${API}/user/photo/${blog.author.username}`}
                    alt={blog.title}
                />
            </div>

            <div className="ml-3">
                <small>
                    <div id="container-user-name">
                        <Link href={`/profile/[username]`} as={`/profile/${blog.author.username}`}>
                            <b>{blog.author.name}</b>
                        </Link>
                    </div>
                </small>

                <small className="text-muted"><b>Written {moment(blog.updatedAt).fromNow()}</b></small>
            </div>
        </div>
    )
}

export default Author;