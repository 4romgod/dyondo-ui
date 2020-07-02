import Header from "./Header/Header";
import HeaderTopics from "./HeaderTopics/HeaderTopics";

import { useState, useEffect } from "react";
import Footer from "./Footer/Footer";

import { list } from "../actions/topic";


const Layout = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [topics, setTopics] = useState([
        {
            "name": "Design",
            "slug": "design"
        },
        {
            "name": "Programming",
            "slug": "programming",
        },
        {
            "name": "Data Science",
            "slug": "data-science"
        },
        {
            "name": "Networking",
            "slug": "networking"
        },
        {
            "name": "DBMS",
            "slug": "dbms"
        }
    ]);

    function handleClick() {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 0);
    }


    // useEffect(() => {
    //     let myTopics = localStorage.getItem("topics");

    //     if (myTopics) {
    //         myTopics = JSON.parse(myTopics);
    //         setTopics(myTopics);
    //     }
    //     else {
    //         list().then(data => {
    //             if (data.error) {
    //                 console.log(data.error);
    //             }
    //             else {
    //                 setTopics(data);
    //                 if (process.browser) {
    //                     localStorage.setItem("topics", JSON.stringify(topics));
    //                 }
    //             }
    //         });
    //     }
    // }, []);

    return (
        <div>
            <header>
                <div>
                    <Header closeNav={isClicked} />
                </div>
                <div>
                    <HeaderTopics closeNav={isClicked} topics={topics} />
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