import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import allTopics from "./topics";

function HeaderTopics() {
    const [topics, setTopics] = useState(allTopics);

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light navbar-light" id="navbar2">

                <button 
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span id="myNavIcon" className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav ml-auto mr-auto">
                        {topics && topics.map((topic, index) => {
                            return (
                                <li key={index} style={{ padding: '0', margin: '0 11px', cursor: 'pointer' }}>
                                    <Link href={`/tags/topic/[slug]`} as={`/tags/topic/${topic.slug}`}>
                                        <NavLink>
                                            {topic.name.toUpperCase()}
                                        </NavLink>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </nav>

        </div>
    );
}

export default HeaderTopics;