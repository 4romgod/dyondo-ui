import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
    return (
        <Layout>
            <article className="overflow-hidden pt-4 pb-5 bg-white">

                <div className="container-fluid pl-0 pr-0 pb-4 heading-container">
                    <div className="row ml-0 mr-0">
                        <div className="col-md-12 pl-0 pr-0 text-center">
                            <img
                                src={`/images/coding monkey.jpg`}
                                alt="coding monkey"
                                className="img img-fluid featured-image heading-img"
                            />

                            <div className="heading-text">
                                <h1 className="font-weight-bold" style={{ color: 'white' }}>
                                    PROGRAMING BLOGS AND TUTORIALS
                                </h1>
                                <p style={{ color: 'white' }}>
                                    Best programming blogs and tutorials on React, Node, Java and
                                    Much more
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            '/images/react.png' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">React</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/react">
                                        <a style={{ color: "#29a48b" }}>
                                            <h3 className="h1">React Js</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">The world's most popular frontend web development library</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            '/images/nodejs.jpeg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">Node</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/node">
                                        <a style={{ color: "#29a48b" }}>
                                            <h3 className="h1">Node Js</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">
                                        The worlds most popular backend development tool for JavaScript Ninjas
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            '/images/java1.jfif' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">Java</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/java">
                                        <a style={{ color: "#29a48b" }}>
                                            <h3 className="h1">Java</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">A Powerfull Platform to build Enterprise Applications</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default Index;