import Header from "./Header/Header";

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
            <Header closeNav={isClicked} />

            <div className="bg-light" onClick={handleClick}>

                <div className="shadow-bottom bg-white">
                    <Search />
                </div>

                {/**Main content of each page */}
                <div className="">
                    {props.children}
                </div>

            </div>

            <div>
                <Footer />
            </div>

        </React.Fragment>
    )
}

export default Layout;