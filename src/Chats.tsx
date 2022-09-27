import React, {FC, useState} from "react";
import {IChat, IQueryChatsResponse, IUser} from "./models";
import {gql, useQuery} from "@apollo/client";
import Chat from "./Chat";

const GET_CHATS = gql`
    query getChats {
        chats {
            id
            users {
                id
                avatar
                username
            }
            lastMessage {
                id
                text
            }
        }
    }

`


const usernamesToString = (users: IUser[]) => {

    const userList = users.slice(1);

    var usernamesString = '';

    for (var i = 0; i < userList.length; i++) {

        usernamesString += userList[i].username;

        if (i - 1 === userList.length) {

            usernamesString += ', ';

        }

    }

    return usernamesString;

}

const shorten = (text: string) => {

    if (text.length > 12) {
        return text.substring(0, text.length - 9) + '...';
    }
    return text;
}


const Chats: React.FC = () => {
    const {data, loading, error} = useQuery<IQueryChatsResponse>(GET_CHATS)
    const [openChatIds, setOpenChatIds] = useState<number[]>([])
    const openChat = (id: number) => {
        let openChatIdsTemp = openChatIds.slice();
        if (openChatIdsTemp.indexOf(id) === -1) {
            if (openChatIdsTemp.length > 2) {
                openChatIdsTemp = openChatIdsTemp.slice(1);
            }
            openChatIdsTemp.push(id);
        }
        setOpenChatIds(openChatIdsTemp);
    }

    const closeChat = (id: number) => {
        let openChatIdsTemp = openChatIds.slice();
        const index = openChatIdsTemp.indexOf(id);
        openChatIdsTemp.splice(index, 1)
        setOpenChatIds(openChatIdsTemp);
    }

    if (loading) {
        return (
            <div className="chats">
                <p>Loadddding...</p>
            </div>
        )
    }
    if (error) {
        return (
            <div className="chats">
                <p>Error: {error.message}</p>
            </div>
        )
    }
    if (!data) {
        return (
            <div className="chats">
                <p>Noooo data</p>
            </div>
        )
    }
    const {chats} = data;
    console.log({chats})

    return (
        <div className="wrapper">
            <div className="chats">
                {chats.map((chat, i) => {
                        const users = chat.users!;
                        return (
                            <div key={"chat" + chat.id} className="chat" onClick={() => openChat(chat.id)}>
                                <div className="header">
                                    <img src={(users.length > 2 ?
                                        '/uploads/group.png' :
                                        users[1].avatar)}/>
                                    <div>
                                        <h2>{shorten(usernamesToString(users))}</h2>
                                        <span>{chat.lastMessage?.text}</span>
                                    </div>

                                </div>

                            </div>

                        )
                    }
                )}

            </div>
            <div className="openChats">
                {openChatIds.map((id, idx) => {
                    return (
                        <Chat chatId={id} closeChat={closeChat} key={`chatWindow${id}`}/>
                    )
                })}
            </div>


        </div>

    )

}

export default Chats