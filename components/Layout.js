import Header from "./Header/Header";
import HeaderTopics from "./HeaderTopics/HeaderTopics";

import { useState } from "react";
import Search from '../components/blog/Search';
import Footer from "./Footer/Footer";


const Layout = (props) => {
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 0);
    }

    return (
        <React.Fragment>
            <header>
                <Header closeNav={isClicked} />
                <HeaderTopics />
            </header>

            <main className="bg-light" onClick={handleClick}>
                {props.children}
            </main>

            <Footer />

        </React.Fragment>
    )
}

export default Layout;