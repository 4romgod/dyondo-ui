import Header from "./Header/Header";
import HeaderTopics from "./HeaderTopics/HeaderTopics";

import { useState, useEffect } from "react";
import Footer from "./Footer/Footer";

import { list } from "../actions/topic";


const Layout = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [topics, setTopics] = useState([]);

    function handleClick() {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 0);
    }


    useEffect(()=>{
        loadTopics();
    }, []);

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