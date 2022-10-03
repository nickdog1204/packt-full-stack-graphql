import React, {createContext, PropsWithChildren, ReactElement, ReactNode} from "react";

export interface IAppContext {
    user: {
        avatar: string;
        username: string;
    } | null
}

export interface IUserProviderProps extends PropsWithChildren {

}


const {Provider, Consumer} = createContext<IAppContext | null>(null)
export const UserProvider: React.FC<IUserProviderProps> = ({children}) => {
    const appCtx: IAppContext = {
        user: {
            avatar: '/uploads/avatar1.png',
            username: 'my first username'
        }
    }


    return (
        <Provider value={appCtx}>
            {children}
        </Provider>
    )

}

export interface IUserConsumerProps extends PropsWithChildren {
}

export const UserConsumer: React.FC<IUserConsumerProps> = ({children}) => {
    return (
        <Consumer>
            {ctx => {

                return React.Children.map(children, (child) => {
                    return React.cloneElement(child as any, {appCtx: ctx})
                })
            }}
        </Consumer>
    )

}