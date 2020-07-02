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
                <p
                    style={{
                        backgroundColor: '#eee',
                        backgroundImage: `url(${API}/user/photo/${blog.author.username})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '50px',
                        width: '50px',
                        margin: '0',
                        borderRadius: '50%',
                    }}
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