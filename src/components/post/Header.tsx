import {IPost} from "../../models";
import React from "react";
import {IDeletePostVariables, useDeletePostMutation} from "../../apollo/mutations/deletePost";
import Dropdown from "../helpers/Dropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IHeaderProps {
    post: IPost
}

const Header: React.FC<IHeaderProps> = ({post}) => {
    const [deletePost] = useDeletePostMutation(post.id);
    const dropdownBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const variables: IDeletePostVariables = {postId: post.id};
        deletePost({variables});
    }
    return (
        <div className="header">
            <Dropdown
                trigger={<FontAwesomeIcon icon="angle-down"/>}
            >
                <button onClick={dropdownBtnClickHandler}>刪除</button>

            </Dropdown>
            <img src={post.user.avatar} alt={post.user.username}/>
            <div>
                <h2>{post.user.username}</h2>
            </div>
        </div>
    )

}
export default Header;