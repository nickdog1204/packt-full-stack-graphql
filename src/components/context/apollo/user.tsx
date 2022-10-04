import React, {PropsWithChildren} from "react";
import {ApolloConsumer} from "@apollo/client";
import {IAppContext} from "../user";


export interface IUserConsumerProps extends PropsWithChildren {
}

export const UserConsumer: React.FC<IUserConsumerProps> = ({children}) => {
    return (
        <ApolloConsumer>
            {client => {
                // Use client.readQuery to get the current
                // logged-in user.
                const appCtx: IAppContext = {
                    user: {
                        username: '我是謝東',
                        avatar: '/uploads/avatar1.png'
                    }
                }
                return (
                    <>
                        {React.Children.map(children, child =>
                            React.cloneElement(child as any, {appCtx})
                        )}
                    </>
                )
            }}
        </ApolloConsumer>
    )

}