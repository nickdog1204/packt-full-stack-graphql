import React from "react";
import {IPost} from "../../models";

interface IContentProps {
    post: IPost;
}

const Content: React.FC<IContentProps> = ({post}) => {
    return (
        <p className="content">
            {post.text}
        </p>
    )

}
export default Content;