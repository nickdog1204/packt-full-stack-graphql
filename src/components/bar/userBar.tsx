import React from "react";
import {IAppContext} from "../context/user";

export interface IUserBarProps {
    appCtx?: IAppContext | null
}

const UserBar: React.FC<IUserBarProps> = ({appCtx}) => {
    console.log({appCtx});
    if (!appCtx) {
        return null
    }
    const {user} = appCtx;
    if (!user) {
        return (
            <div className="user">
                <h1>Nooo user</h1>
            </div>
        )
    }
    const {avatar, username} = user;
    return (
        <div className="user">
            <img src={avatar} alt={username}/>
            <span>{username}</span>
        </div>
    )

}
export default UserBar;