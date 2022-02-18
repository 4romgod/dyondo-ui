import React, { useState, useEffect } from 'react';
import { APP_NAME } from "../../config";
import Link from "next/link";
import Router from "next/router";
import Nprogress from "nprogress";
import { signout, isAuth } from "../../actions/auth";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, 
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { dyondoClient } from "../../helpers/utils";
import "../.././node_modules/nprogress/nprogress.css";

Router.onRouteChangeStart = function (url) { Nprogress.start() }
Router.onRouteChangeComplete = function (url) { Nprogress.done() }
Router.onRouteChangeError = function (url) { Nprogress.done() }

const navLinkStyle = {
    cursor: 'pointer',
    height: '100%',
    padding: '0',
    display: 'flex',
    alignItems: 'center'
};

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [topics, setTopics] = useState([]);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            setIsOpen(props.closeNav);
        }

        const fetchTopics = async () => {
            let someTopics = await dyondoClient.getRetrieveTopics();
            setTopics(someTopics.data);
        }
        fetchTopics();
    }, [props.closeNav]);

    const handleSignout = () => {
        signout(() => {
            Router.replace(`/signin`)
        });
    }

    const showDashboard = () =>{
        if (isAuth()) {
            if (isAuth().role === 0) {
                return (
                    <NavItem style={{ padding: '0', margin: '0 13px' }} onClick={() => setIsOpen(false)}>
                        <Link href="/user">
                            <NavLink style={navLinkStyle}>
                                Dashboard
                            </NavLink>
                        </Link>
                    </NavItem>
                )
            } else if (isAuth().role === 1) {
                return (
                    <NavItem style={{ padding: '0', margin: '0 13px' }} onClick={() => setIsOpen(false)}>
                        <Link href="/admin">
                            <NavLink style={navLinkStyle}>
                                Dashboard
                            </NavLink>
                        </Link>
                    </NavItem>
                )
            }
        }
        return;
    }

    const showSigninAndUp = () => {
        return (
            !isAuth() && <React.Fragment >
                <NavItem style={{ padding: '0', margin: '0 11px' }} onClick={() => setIsOpen(false)}>
                    <Link href="/signin">
                        <NavLink style={navLinkStyle}>
                            Sign in
                    </NavLink>
                    </Link>
                </NavItem>

                <NavItem style={{ padding: '0', margin: '0 11px' }} onClick={() => setIsOpen(false)}>
                    <Link href="/signup">
                        <NavLink style={navLinkStyle}>
                            Sign up
                    </NavLink>
                    </Link>
                </NavItem>

            </React.Fragment>
        )
    }

    const showWriteBlog = () => {
        if (isAuth()) {
            if (isAuth().role === 0) {
                return (
                    <NavItem style={{ padding: '0', margin: '0 11px' }}>
                        <a href={`/user/crud/blog`}
                            style={navLinkStyle}
                        >
                            <p className="btn btn-outline-success pl-3 pr-3 write-blog">
                                <strong>Write a blog</strong>
                            </p>
                        </a>
                    </NavItem>
                )
            } else if (isAuth().role === 1) {
                return (
                    <NavItem style={{ padding: '0', margin: '0 11px' }}>
                        <a href={`/admin/crud/blog`}
                            style={navLinkStyle}
                        >
                            <p className="btn btn-outline-success pl-3 pr-3 write-blog" onClick={() => setIsOpen(false)}>
                                <strong>Write a blog</strong>
                            </p>
                        </a>
                    </NavItem>
                )
            }
        } else {
            return (
                <NavItem style={{ padding: '0', margin: '0 11px' }}>
                    <a href={`/signup`}
                        style={navLinkStyle}
                    >
                        <p className="btn btn-outline-success pl-3 pr-3 write-blog">
                            <strong>Write a blog</strong>
                        </p>
                    </a>
                </NavItem>
            )
        }
    }

    return (
        <React.Fragment>
            <Navbar color="dark" dark expand="md" className="navbar" id="navbar1" style={{ borderBottom: '0.05px solid rgb(202, 199, 199)' }}>
                <Link href="/">
                    <NavLink className="font-weight-bold" id="container-logo" style={{ cursor: 'pointer', color: 'black', fontSize: '1.5rem' }}>
                        <img src="/images/logo.png" alt={`logo | ${APP_NAME}`} />
                    </NavLink>
                </Link>

                <NavbarToggler className="collapsed position-relative" onClick={toggle} >
                    {isOpen && <img src="/images/close.svg" style={{ width: '20px' }} />}
                </NavbarToggler>

                <Collapse isOpen={isOpen} navbar>

                    <Nav className="ml-auto" navbar>
                        <React.Fragment>
                            <React.Fragment>
                                <div id="write-blog-phone" onClick={() => setIsOpen(false)}>
                                    {isAuth() &&
                                        (isAuth().role === 0) ?
                                        <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                            <a href={`/user/crud/blog`}
                                                style={navLinkStyle}
                                            >
                                                Write a blog
                                        </a>
                                        </NavItem>
                                        :
                                        <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                            <a href={`/admin/crud/blog`}
                                                style={navLinkStyle}
                                            >
                                                Write a blog
                                        </a>
                                        </NavItem>
                                    }
                                </div>
                            </React.Fragment>

                            <NavItem style={{ padding: '0', margin: '0 11px' }} onClick={() => setIsOpen(false)}>
                                <Link href="/blogs">
                                    <NavLink style={navLinkStyle}>
                                        Tutorials
                                    </NavLink>
                                </Link>
                            </NavItem>

                            <NavItem style={{ padding: '0', margin: '0 11px' }} onClick={() => setIsOpen(false)}>
                                <Link href="/news">
                                    <NavLink style={navLinkStyle}>
                                        News
                                    </NavLink>
                                </Link>
                            </NavItem>

                            <div id="topics">
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Topics
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {topics.map((topic, index) =>
                                            <DropdownItem key={index}>
                                                <NavItem style={{ padding: '0', margin: '0 11px' }} onClick={() => setIsOpen(false)}>
                                                    <Link href={`/tags/topic/[slug]`} as={`/tags/topic/${topic.slug}`}>
                                                        <NavLink style={navLinkStyle}>
                                                            {topic.name}
                                                        </NavLink>
                                                    </Link>
                                                </NavItem>
                                            </DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>

                            {showDashboard()}

                            <NavItem style={{ padding: '0', margin: '0 11px' }} onClick={() => setIsOpen(false)}>
                                <Link href="/newsletter">
                                    <NavLink style={navLinkStyle}>
                                        Newsletter
                                    </NavLink>
                                </Link>
                            </NavItem>

                            <NavItem style={{ padding: '0', margin: '0 11px' }} onClick={() => setIsOpen(false)}>
                                <Link href="/contact">
                                    <NavLink style={navLinkStyle}>
                                        Contact
                                    </NavLink>
                                </Link>
                            </NavItem>

                            {showSigninAndUp()}

                            {isAuth() && (
                                <React.Fragment>
                                    <NavItem style={{ padding: '0', margin: '0 11px' }} onClick={() => setIsOpen(false)}>
                                        <NavLink
                                            onClick={handleSignout}
                                            style={navLinkStyle}
                                        >
                                            Signout
                                        </NavLink>
                                    </NavItem>
                                </React.Fragment>
                            )}
                            {showWriteBlog()}
                        </React.Fragment>
                    </Nav>
                </Collapse>
            </Navbar>

        </React.Fragment>
    );
}

export default Header;