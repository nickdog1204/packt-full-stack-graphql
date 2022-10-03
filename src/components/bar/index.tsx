import React from "react";
import SearchBar from "./searchBar";
import {UserConsumer} from "../context/user";
import UserBar from "./userBar";


const Bar: React.FC = () => {
    return (
        <div className="topbar">
            <div className="inner">
                <SearchBar/>
                <UserConsumer>
                    <UserBar/>
                </UserConsumer>
            </div>
        </div>
    )
}
export default Bar;