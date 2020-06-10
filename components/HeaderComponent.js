import { useState, useEffect } from 'react';
import { APP_NAME } from "../config";
import Link from "next/link";
import Router from "next/router";
import Nprogress from "nprogress";

import { signout, isAuth } from "../actions/auth";

import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
    NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, NavbarText
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
            //setIsOpen(props.closeNav);
        }
    }, [props.closeNav]);


    return (
        <div data-toggle="collapse" data-target=".navbar-collapse.show">

            <nav className="navbar fixed-top navbar-expand-md bg-dark">
                <Link href="/">
                    <a className="navbar-brand font-weight-bold ml-3" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                        {APP_NAME}
                    </a>
                </Link>

                <button className="navbar-toggler collapsed position-relative"
                    type="button" data-toggle="collapse"
                    data-target="#collapsingNavbar"
                    aria-controls="collapsingNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span> </span>
                    <span> </span>
                    <span> </span>
                </button>

                <div className="collapse navbar-collapse" id="collapsingNavbar">
                    <ul className="nav navbar-nav ml-auto">
                        <li style={{ padding: '0', margin: '0 13px' }}>
                            <Link href="/blogs">
                                <NavLink style={navLinkStyle}>
                                    Blogs
                                </NavLink>
                            </Link>
                        </li>

                        <li style={{ padding: '0', margin: '0 13px' }}>
                            <Link href="/contact">
                                <NavLink style={navLinkStyle}>
                                    Contact
                            </NavLink>
                            </Link>
                        </li>

                        {!isAuth() && <React.Fragment>

                            <li style={{ padding: '0', margin: '0 13px' }}>
                                <Link href="/signin">
                                    <NavLink style={navLinkStyle}>
                                        Signin
                                </NavLink>
                                </Link>
                            </li>

                            <li style={{ padding: '0', margin: '0 13px' }}>
                                <Link href="/signup">
                                    <NavLink style={navLinkStyle}>
                                        Signup
                                </NavLink>
                                </Link>
                            </li>

                        </React.Fragment>}


                        {isAuth() && (isAuth().role === 0) && (
                            <li style={{ padding: '0', margin: '0 13px' }}>
                                <Link href="/user">
                                    <NavLink style={navLinkStyle}>
                                        {`${isAuth().name}'s Dashboard`}
                                    </NavLink>
                                </Link>
                            </li>
                        )}

                        {isAuth() && (isAuth().role === 1) && (
                            <li style={{ padding: '0', margin: '0 13px' }}>
                                <Link href="/admin">
                                    <NavLink style={navLinkStyle}>
                                        {isAuth().name}'s Dashboard
                                </NavLink>
                                </Link>
                            </li>
                        )}

                        {isAuth() && (
                            <React.Fragment>
                                <li style={{ padding: '0', margin: '0 13px' }}>
                                    <NavLink
                                        onClick={handleSignout}
                                        style={navLinkStyle}
                                    >
                                        Signout
                                </NavLink>
                                </li>
                            </React.Fragment>
                        )}

                        <React.Fragment>
                            {isAuth() && isAuth().role === 0 &&
                                <li style={{ padding: '0', margin: '0 13px' }}>
                                    <a href={`/user/crud/blog`}
                                        style={navLinkStyle}
                                    >
                                        <p className="btn btn-success pl-4 pr-4 write-blog">
                                            <strong>Write a blog</strong>
                                        </p>
                                    </a>
                                </li>}

                            {isAuth() && isAuth().role === 1 &&
                                <li style={{ padding: '0', margin: '0 13px' }}>
                                    <a href={`/admin/crud/blog`}
                                        style={navLinkStyle}
                                    >
                                        <p className="btn btn-success pl-4 pr-4 write-blog">
                                            <strong>Write a blog</strong>
                                        </p>
                                    </a>
                                </li>}

                            {!isAuth() &&
                                <li style={{ padding: '0', margin: '0 13px' }}>
                                    <a href={`/signup`}
                                        style={navLinkStyle}
                                    >
                                        <p className="btn btn-success pl-4 pr-4 write-blog">
                                            <strong>Write a blog</strong>
                                        </p>
                                    </a>
                                </li>}
                        </React.Fragment>

                    </ul>
                </div>
            </nav>
        </div>
    )

}

export default Header;