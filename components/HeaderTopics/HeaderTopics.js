import { useState, useEffect } from 'react';
import Link from "next/link";
import Router from "next/router";

import { list } from "../../actions/topic";


import {
    Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink
} from 'reactstrap';

function HeaderTopics(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [topics, setTopics] = useState(props.topics);

    function toggle() {
        setIsOpen(!isOpen);
    };

    
    useEffect(() => {
        loadTopics();
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsOpen(props.closeNav);
        }
    }, [props.closeNav]);


    function loadTopics() {
        list().then(data => {
            //console.log(data);
            if (data.error) {
                console.log(data.error);
            }
            else {
                setTopics(data);
            }
        });
    }


    return (
        <React.Fragment>
            <Navbar color="dark" dark expand="md" className="navbar" id="navbar2">

                <NavbarToggler className="collapsed" onClick={toggle} >
                    {isOpen && <img src="/images/close.svg" style={{ width: '20px' }} />}
                </NavbarToggler>

                <Collapse isOpen={isOpen} navbar>

                    <Nav className="mr-auto" navbar onClick={() => setIsOpen(false)}>
                        <React.Fragment>

                            <NavItem style={{ padding: '0', margin: '0 11px' }}>
                                    <NavLink>
                                        Topics : 
                                    </NavLink>
                            </NavItem>


                            {topics && topics.map((topic, index) => {
                                return (
                                    <NavItem key={index} style={{ padding: '0', margin: '0 11px', cursor: 'pointer' }}>
                                        <Link href={`/tags/topic/[slug]`} as={`/tags/topic/${topic.slug}`}>
                                            <NavLink>
                                                {topic.name}
                                            </NavLink>
                                        </Link>
                                    </NavItem>
                                )
                            })}


                        </React.Fragment>
                    </Nav>
                </Collapse>
            </Navbar>

        </React.Fragment>
    );

}

export default HeaderTopics;