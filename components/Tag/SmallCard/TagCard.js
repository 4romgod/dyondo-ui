import Link from 'next/link';
import moment from 'moment';

function SmallCard({ tag }) {

    return (
        <div className="card mb-3 shadow">
            <div className="row ml-0 mr-0">

                <section className="col-sm-7 col-md-12 pl-0 pr-0">
                    <div className="pl-3 pr-2 pt-3">

                        <Link href={`/tags/[slug]`} as={`/tags/${tag.slug}`}>
                            <a style={{ color: 'rgb(41,41,41)' }}>
                                <h5 className="card-title">
                                    {tag.name}
                                </h5>
                            </a>
                        </Link>
                        
                    </div>
                </section>

            </div>

        </div>

    );
}

export default SmallCard;