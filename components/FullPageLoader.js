import {useState} from "react";

function FullPageLoader(){
    const [loading, setLoadeing] = useState(false);

    return (
        <div className="loader-container">
            <div className="loader">
                <img 
                    src="/images/loading.gif"
                />
            </div>
        </div>
    )
}

export default FullPageLoader;