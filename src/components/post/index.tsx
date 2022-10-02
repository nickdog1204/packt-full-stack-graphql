import React from "react";
import {IPost} from "../../models";
import Header from "./Header";
import Content from "./Content";

interface IPostProps {
    post: IPost
}

const Post: React.FC<IPostProps> = ({post}) => {
    return (
        <div className={`post${post.id < 0 ? ' optimistic' : ''}`}>
            <Header post={post}/>
            <Content post={post}/>
        </div>
    )
}
export default Post;