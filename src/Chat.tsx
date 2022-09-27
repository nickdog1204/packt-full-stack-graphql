import React, {FC, PropsWithChildren, useState} from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";
import {IAddMessageResponse, IAddMessageVariables, IMessage, IQueryChatResponse, IQueryChatVariables} from "./models";

const GET_CHAT = gql`
    query getChat($chatId: Int!) {
        chat(chatId: $chatId) {
            id
            messages {
                id
                text
                user {
                    id
                }
            }
            users {
                id
                username
                avatar
            }

        }
    }
`;

const ADD_MESSAGE = gql`
    mutation addOneMessage($messageInput: MessageInput!) {
        addMessage(message: $messageInput) {
            id
            text
            user {
                id
            }

        }
    }
`

export interface ChatProps extends PropsWithChildren {
    chatId: number;
    closeChat: (chatId: number) => void;
}


const Chat: FC<ChatProps> = ({chatId, closeChat}) => {
    const {data, error, loading} = useQuery<IQueryChatResponse, IQueryChatVariables>(GET_CHAT, {
        variables: {chatId}
    })
    const [text, setText] = useState('');
    const keyPressHandlerAsync = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && text.length) {
            const variables: IAddMessageVariables = {
                messageInput: {
                    chatId,
                    text
                }
            }
            await addMessage({variables})
            setText('')
        }

    }
    const [addMessage] = useMutation<IAddMessageResponse, IAddMessageVariables>(ADD_MESSAGE, {
        update: (cache, {data: myData}) => {
            if (!myData) {
                console.log('Empty returned AddMessage Response')
                return (
                    <div className="chatWindow">
                        <p>Empty returned AddMessage Response</p>
                    </div>
                )
            }
            const {addMessage} = myData;

            const myChat = data!.chat as any;
            const identifiedId = cache.identify(myChat)
            console.log({myChat, identifiedId})
            cache.modify({
                id: cache.identify(data!.chat as any),
                fields: {
                    messages(existingMessages = []) {
                        const newMessageRef = cache.writeFragment({
                            data: addMessage,
                            fragment: gql`
                                fragment NewMessage on Chat {
                                    id
                                    type
                                }
                            `
                        });
                        return [...existingMessages, newMessageRef];
                    },
                    lastMessage(prevMessage = '') {
                        const lastMessage : IMessage = {
                            id: addMessage.id,
                            text: addMessage.text
                        };
                        return lastMessage;

                    }

                }
            })

        }
    })
    if (loading) {
        return (
            <div className="chatWindow">
                <p>Loadinnnnng</p>
            </div>
        )

    }
    if (error) {
        return (
            <div className="chatWindow">
                <p>Errror: {error.message}</p>
            </div>
        )
    }
    if (!data) {
        return (
            <div className="chatWindow">
                <p>No Data!!!</p>
            </div>
        )
    }
    const {chat} = data;
    const users = chat.users!
    const messages = chat.messages!

    return (
        <div className="chatWindow">
            <div className="header">
                <span>{users[1].username}</span>
                <button onClick={() => closeChat(chatId)} className="close">X</button>
            </div>
            <div className="messages">
                {messages.map((message, j) => {
                    return (
                        <div key={'message' + message.id}
                             className={`message ${message.user!.id > users[0].id ? 'left' : 'right'}`}>
                            {message.text}
                        </div>
                    )
                })}
            </div>
            <div className="input">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        keyPressHandlerAsync(e)
                    }}
                />
            </div>
        </div>
    )
}

export default Chat;
