import { API } from '../../config';
import Link from "next/link";
import moment from 'moment';

function Author({ blog }) {

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
                <img
                    src={`${API}/user/photo/${blog.author.username}`}
                    alt={blog.title}
                    className="img img-fluid featured"
                    style={{ borderRadius: '100%', width: '50px', height: '50px' }}
                />
            </div>

            <div className="ml-3">
                <small>
                    <div>
                        <b>{blog.author.name}</b> {" | "}
                        <Link href={`/profile/[username]`} as={`/profile/${blog.author.username}`}>
                            <a><b>{blog.author.username}</b></a>
                        </Link>
                    </div>
                </small>
                <small className="text-muted"><b>{moment(blog.updatedAt).fromNow()}</b></small>
            </div>
        </div>
    )
}

export default Author;