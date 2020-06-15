import {useState} from "react";
import "./loader.css"

function FullPageLoader(){
    const [loading, setLoadeing] = useState(false);

    return (
        <div className="loader-container">
            <div className="loader">
                <img 
                    src="/images/loading.gif"
                    style={{zIndex: '1000'}}
                />
            </div>
        </div>
    )
}

export default FullPageLoader;