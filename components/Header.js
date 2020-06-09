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


    function writeBlogEndpoint() {
        let endpoint;
        if (isAuth() && isAuth().role === 0) {
            endpoint = `/user/crud/blog`;
        }
        else if (isAuth() && isAuth().role === 1) {
            endpoint = `/admin/crud/blog`;
        }
        else if (!isAuth()) {
            endpoint = "/signup";
        }
        return endpoint;
    }

    return (
        <React.Fragment>
            <Navbar color="dark" dark expand="md" className="navbar fixed-top">
                <Link href="/">
                    <NavLink className="font-weight-bold" style={{ cursor: 'pointer', color: 'white', fontSize: '1.5rem' }}>{APP_NAME}</NavLink>
                </Link>

                <NavbarToggler onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>

                        <React.Fragment>

                            <NavItem>
                                <Link href="/blogs">
                                    <NavLink style={{ cursor: 'pointer' }}>
                                        Blogs
                                    </NavLink>
                                </Link>
                            </NavItem>

                            <NavItem>
                                <Link href="/contact">
                                    <NavLink style={{ cursor: 'pointer' }}>
                                        Contact
                                    </NavLink>
                                </Link>
                            </NavItem>

                            {!isAuth() && <React.Fragment>

                                <NavItem>
                                    <Link href="/signin">
                                        <NavLink style={{ cursor: 'pointer' }}>
                                            Signin
                                    </NavLink>
                                    </Link>
                                </NavItem>

                                <NavItem>
                                    <Link href="/signup">
                                        <NavLink style={{ cursor: 'pointer' }}>
                                            Signup
                                    </NavLink>
                                    </Link>
                                </NavItem>

                            </React.Fragment>}


                            {isAuth() && (isAuth().role === 0) && (
                                <NavItem>
                                    <Link href="/user">
                                        <NavLink style={{ cursor: 'pointer' }}>
                                            {`${isAuth().name}'s Dashboard`}
                                        </NavLink>
                                    </Link>
                                </NavItem>
                            )}

                            {isAuth() && (isAuth().role === 1) && (
                                <NavItem>
                                    <Link href="/admin">
                                        <NavLink style={{ cursor: 'pointer' }}>
                                            {isAuth().name}'s Dashboard
                                    </NavLink>
                                    </Link>
                                </NavItem>
                            )}

                            {isAuth() && (
                                <React.Fragment>
                                    <NavItem>
                                        <NavLink onClick={handleSignout} style={{ cursor: 'pointer' }}>
                                            Signout
                                    </NavLink>
                                    </NavItem>
                                </React.Fragment>
                            )}

                            <NavItem>
                                <a href={writeBlogEndpoint()}
                                    style={{ cursor: 'pointer' }}
                                    className="btn btn-success pl-4 pr-4"
                                >
                                    <strong>Write a blog</strong>
                                </a>
                            </NavItem>

                        </React.Fragment>
                    </Nav>
                </Collapse>
            </Navbar>

        </React.Fragment>
    );

}

export default Header;