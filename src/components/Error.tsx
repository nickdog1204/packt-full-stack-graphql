import React, {PropsWithChildren} from "react";


export interface IErrorProps extends PropsWithChildren {

}

const Error: React.FC<IErrorProps> = ({children}) => {
    return (
        <div className="error message">
            {children}
        </div>
    )
}
export default Error;