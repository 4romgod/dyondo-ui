import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import HeaderTopics from "./Header/HeaderTopics";
import Footer from "./Footer/Footer";

const Layout = (props) => {
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 0);
    }

    return (
        <div>
            <header>
                <div>
                    <Header closeNav={isClicked} />
                </div>
                <div>
                    <HeaderTopics />
                </div>
            </header>

            <main className="bg-light" onClick={handleClick} >
                {props.children}
            </main>

            <div>
                <Footer />
            </div>

        </div>
    )
}

export default Layout;