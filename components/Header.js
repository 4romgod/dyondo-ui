import { useState, useEffect } from 'react';
import { APP_NAME } from "../config";
import Link from "next/link";
import Router from "next/router";
import Nprogress from "nprogress";

import { signout, isAuth } from "../actions/auth";

import {
    Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink
} from 'reactstrap';

import ".././node_modules/nprogress/nprogress.css";


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

function Header(props) {
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        //console.log(props.navOpen);

        setIsOpen(!isOpen);
    };


    function handleSignout() {
        signout(function () {
            Router.replace(`/signin`)
        });
    }


    useEffect(() => {
        if (isOpen) {
            setIsOpen(props.closeNav);
        }
    }, [props.closeNav]);


    function showDashboard() {
        if (isAuth()) {
            if (isAuth().role === 0) {
                return (
                    <NavItem style={{ padding: '0', margin: '0 13px' }}>
                        <Link href="/user">
                            <NavLink style={navLinkStyle}>
                                Dashboard
                            </NavLink>
                        </Link>
                    </NavItem>
                )
            }
            else if (isAuth().role === 1) {
                return (
                    <NavItem style={{ padding: '0', margin: '0 13px' }}>
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


    function showSigninAndUp(){
        return (
            !isAuth() && <React.Fragment>
                <NavItem style={{ padding: '0', margin: '0 11px' }}>
                    <Link href="/signin">
                        <NavLink style={navLinkStyle}>
                            Signin
                    </NavLink>
                    </Link>
                </NavItem>

                <NavItem style={{ padding: '0', margin: '0 11px' }}>
                    <Link href="/signup">
                        <NavLink style={navLinkStyle}>
                            Signup
                    </NavLink>
                    </Link>
                </NavItem>

            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Navbar color="dark" dark expand="md" className="navbar fixed-top">
                <Link href="/">
                    <NavLink className="font-weight-bold" style={{ cursor: 'pointer', color: 'black', fontSize: '1.5rem' }}>
                        <img src="/images/blog.png" style={{width: '30px', paddingRight: '5px'}}/>
                        {APP_NAME}
                    </NavLink>
                </Link>

                <NavbarToggler className="collapsed position-relative" onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <React.Fragment>

                            {/* write blog on phone screen size */}
                            <React.Fragment>
                                <div id="write-blog-phone">
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


                            <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                <Link href="/blogs">
                                    <NavLink style={navLinkStyle}>
                                        Tutorials
                                    </NavLink>
                                </Link>
                            </NavItem>

                            {showDashboard()}

                            <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                <Link href="/newsletter">
                                    <NavLink style={navLinkStyle}>
                                        Newsletter
                                    </NavLink>
                                </Link>
                            </NavItem>

                            <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                <Link href="/contact">
                                    <NavLink style={navLinkStyle}>
                                        Contact
                                    </NavLink>
                                </Link>
                            </NavItem>

                            {showSigninAndUp()}


                            {isAuth() && (
                                <React.Fragment>
                                    <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                        <NavLink
                                            onClick={handleSignout}
                                            style={navLinkStyle}
                                        >
                                            Signout
                                        </NavLink>
                                    </NavItem>
                                </React.Fragment>
                            )}

                            {/* write blog on big screen size */}
                            <React.Fragment>
                                {isAuth() && isAuth().role === 0 &&
                                    <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                        <a href={`/user/crud/blog`}
                                            style={navLinkStyle}
                                        >
                                            <p className="btn btn-success pl-3 pr-3 write-blog">
                                                <strong>Write a blog</strong>
                                            </p>
                                        </a>
                                    </NavItem>}

                                {isAuth() && isAuth().role === 1 &&
                                    <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                        <a href={`/admin/crud/blog`}
                                            style={navLinkStyle}
                                        >
                                            <p className="btn btn-outline-success pl-3 pr-3 write-blog">
                                                <strong>Write a blog</strong>
                                            </p>
                                        </a>
                                    </NavItem>}

                                {!isAuth() &&
                                    <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                        <a href={`/signup`}
                                            style={navLinkStyle}
                                        >
                                            <p className="btn btn-outline-success pl-3 pr-3 write-blog">
                                                <strong>Write a blog</strong>
                                            </p>
                                        </a>
                                    </NavItem>}
                            </React.Fragment>

                        </React.Fragment>
                    </Nav>
                </Collapse>
            </Navbar>

        </React.Fragment>
    );

}

export default Header;