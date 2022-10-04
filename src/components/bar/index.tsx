import React from "react";
import SearchBar from "./searchBar";
import UserBar from "./userBar";
import {UserConsumer} from "../context/apollo/user";


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