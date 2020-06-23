import Header from "./Header/Header";
import HeaderTopics from "./HeaderTopics/HeaderTopics";

import { useState } from "react";
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
                <Header closeNav={isClicked} />
                <HeaderTopics closeNav={isClicked} />
            </header>

            <main className="bg-light" onClick={handleClick}>
                {props.children}
            </main>

            <Footer />

        </div>
    )
}

export default Layout;