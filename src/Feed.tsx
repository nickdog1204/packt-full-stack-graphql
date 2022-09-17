import React, {FormEvent, FormEventHandler, useState} from 'react';
import logo from './logo.svg';
import {IAddOnePostResponse, IAddOnePostVariables, IPost, IQueryPostsResponse} from "./models";
import {ApolloCache, ApolloClient, DefaultContext, gql, useMutation, useQuery} from "@apollo/client";

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
`;

const ADD_POST = gql`
    mutation addOnePost($postInput: PostInput!) {
        addPost(post: $postInput) {
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
    const {data, error, loading} = useQuery<IQueryPostsResponse>(GET_POSTS);
    const [addOnePost] =
        useMutation<IAddOnePostResponse, IAddOnePostVariables, DefaultContext, ApolloCache<boolean>>(ADD_POST, {
            update: (cache, {data}) => {
                if (!data) {
                    console.log('EMMMPPPPPTYYYYY DATA')
                    return <p>EMMMPTTTTY DATA</p>
                }
                const {addPost} = data;

                const {posts} = cache.readQuery<IQueryPostsResponse>({query: GET_POSTS})!;
                const newData: IQueryPostsResponse = {posts: [addPost, ...posts]}
                cache.writeQuery<IQueryPostsResponse>({query: GET_POSTS, data: newData});
            }
        });
    const [postContent, setPostContent] = useState('');
    if (!data) {
        return (
            <p>No data</p>
        )
    }
    const {posts} = data;


    const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const addOnePostVariables: IAddOnePostVariables = {
            postInput: {text: postContent}
        }
        const {data} = await addOnePost({variables: addOnePostVariables})
        const {addPost} = data!;


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
