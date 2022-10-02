import React from "react";
import SearchBar from "./searchBar";


const Bar: React.FC = () => {
    return (
        <div className="topbar">
            <div className="inner">
                <SearchBar/>
            </div>
        </div>
    )
}
export default Bar;