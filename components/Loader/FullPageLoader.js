import React, { useState } from "react";

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