import React, {FormEvent, FormEventHandler, useState} from 'react';
import logo from './logo.svg';
import {IPost, IPostsResponse} from "./models";
import {gql, useQuery} from "@apollo/client";

const GET_POSTS = gql`
    query getAllPosts {
        posts {
            id
            text
            user {
                avatar
                username
            }
        }
    }
`

function Feed() {
    const {data, error, loading} = useQuery<IPostsResponse>(GET_POSTS);
    const [postContent, setPostContent] = useState('');
    if(!data) {
        return (
            <p>No data</p>
        )
    }
    const {posts} = data;
    console.log({posts});


    const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        // setPosts(prevState => {
        //     const newPost: IPost = {
        //         id: prevState.length + 1,
        //         text: postContent,
        //         user: {
        //             avatar: '/uploads/avatar1.png',
        //             username: '測試用戶'
        //         }
        //     }
        //
        //     return [newPost, ...prevState]
        // })


        setPostContent('');
    }
    if (loading) {
        return <p>LOAAAADIIIIIINGGGGG</p>
    }
    if (error) {
        return (
            <p>Error {error.message}</p>
        )
    }
    return (
        <div className="container">
            <div className="postForm">
                <form onSubmit={submitHandler}>
                    <textarea
                        value={postContent}
                        onChange={(e) => {
                            setPostContent(e.target.value);
                        }}
                        placeholder="寫下你的文章!!"
                    />
                    <input type="submit" value="送出"/>
                </form>
            </div>
            <div className="feed">
                {posts.map((post, idx) => {
                    return (
                        <div key={post.id} className="post">
                            <div className="header">
                                <img src={post.user.avatar} alt={post.user.username}/>
                                <h2>{post.user.username}</h2>
                            </div>
                            <p className="content">
                                {post.text}
                            </p>

                        </div>
                    )
                })}
            </div>
        </div>
    );
}


export default Feed;
