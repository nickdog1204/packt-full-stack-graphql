import React, {FormEvent, FormEventHandler, useState} from 'react';
import logo from './logo.svg';
import {
    IAddOnePostResponse,
    IAddOnePostVariables,
    IPost,
    IQueryPostsFeedResponse,
    IQueryPostsFeedVariables,
    IQueryPostsResponse
} from "./models";
import {ApolloCache, ApolloClient, DefaultContext, gql, useMutation, useQuery} from "@apollo/client";
import {fragments} from "./apollo/fragments";
import InfiniteScroll from "react-infinite-scroll-component";

// const GET_POSTS = gql`
//     query getAllPosts {
//         posts {
//             id
//             text
//             user {
//                 avatar
//                 username
//             }
//         }
//     }
// `;
const GET_POSTS = gql`
    query getPostsFeed($pageNum: Int, $pageSize: Int) {
        postsFeed(pageNum: $pageNum, pageSize: $pageSize) {
            posts {
                id
                text
                user {
                    avatar
                    username
                }
            }

        }
    }
`

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
    const [hasMore, setHasMore] = useState(true);
    const [pageNum, setPageNum] = useState(0);
    const variables: IQueryPostsFeedVariables = {
        pageNum: 0,
        pageSize: 10
    }

    const {data, error, loading, fetchMore} = useQuery<IQueryPostsFeedResponse, IQueryPostsFeedVariables>(GET_POSTS, {
        pollInterval: 5000,
        variables
    });
    const [addOnePost] =
        useMutation<IAddOnePostResponse, IAddOnePostVariables, DefaultContext, ApolloCache<boolean>>(ADD_POST, {
            update: (cache, {data}) => {
                if (!data) {
                    console.log('EMMMPPPPPTYYYYY DATA')
                    return <p>EMMMPTTTTY DATA</p>
                }
                const {addPost} = data;

                // const {posts} = cache.readQuery<IQueryPostsResponse>({query: GET_POSTS})!;
                // const newData: IQueryPostsResponse = {posts: [addPost, ...posts]}
                // cache.writeQuery<IQueryPostsResponse>({query: GET_POSTS, data: newData});

                cache.modify({
                    fields: {
                        postsFeed(existingPostsFeed) {
                            const {posts: existingPosts} = existingPostsFeed;
                            const newPostRef = cache.writeFragment({
                                data: addPost,
                                fragment: fragments.newPostFragment
                            });
                            return {
                                ...existingPostsFeed,
                                posts: [newPostRef, ...existingPosts]
                            }
                        }
                    }
                })
            },
            optimisticResponse: (vars) => {
                return {
                    __typename: 'mutation',
                    addPost: {
                        __typename: 'Post',
                        text: vars.postInput.text,
                        id: -1,
                        user: {
                            id: -1,
                            __typename: 'User',
                            avatar: '/uploads/loader-ripple.svg',
                            username: 'Loadiiiing'
                        }
                    }
                }
            }
        });
    const [postContent, setPostContent] = useState('');
    if (!data) {
        return (
            <p>No data</p>
        )
    }
    const {postsFeed: {posts}} = data;
    const loadMore = (fetchMore: any) => {
        // @ts-ignore
        // const self = this;

        // @ts-ignore
        fetchMore({
            variables: {
                pageNum: pageNum + 1,
            },
            updateQuery(previousResult: any, data: any) {
                const {fetchMoreResult} = data;
                if(!fetchMoreResult.postsFeed.posts.length) {
                    setHasMore(false);
                    return previousResult;
                }

                setPageNum(pageNum + 1);

                const newData = {
                    postsFeed: {
                        __typename: 'PostFeed',
                        posts: [
                            ...previousResult.postsFeed.posts,
                            ...fetchMoreResult.postsFeed.posts
                        ]
                    }
                };
                return newData;
            }
        });
    }


    const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const addOnePostVariables: IAddOnePostVariables = {
            postInput: {text: postContent}
        }
        const {data} = await addOnePost({variables: addOnePostVariables})
        const {addPost} = data!;
        console.log({addPost});


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
                <InfiniteScroll
                    next={() => loadMore(fetchMore)}
                    hasMore={hasMore}
                    loader={<div className="loader" key="loader">Loading</div>}
                    dataLength={posts.length}>
                    {posts.map((post, idx) => {
                        return (
                            <div key={post.id} className={"post" + (post.id < 0 ? " optimistic" : "")}>
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
                </InfiniteScroll>

            </div>
        </div>
    );
}


export default Feed;
