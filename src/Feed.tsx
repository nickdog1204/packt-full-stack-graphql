import React, {FormEvent, FormEventHandler, useRef, useState} from 'react';
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
import Loading from "./components/Loading";
import Error from "./components/Error";
import Post from "./components/post";
import {GET_POSTS_WITH_PAGE_NUM_AND_PAGE_SIZE} from "./apollo/queries/getPosts";
import {useAddPostMutation} from "./apollo/mutations/addPost";

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

    const {
        data,
        error,
        loading,
        fetchMore
    } = useQuery<IQueryPostsFeedResponse, IQueryPostsFeedVariables>(GET_POSTS_WITH_PAGE_NUM_AND_PAGE_SIZE, {
        pollInterval: 5000,
        variables
    });
    const [addOnePost] = useAddPostMutation();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    if (loading) {
        return (
            <Loading/>
        )
    }
    if (error) {
        return (
            <Error>
                <p>錯誤了 {error.message}</p>
            </Error>
        )
    }
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
                if (!fetchMoreResult.postsFeed.posts.length) {
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
        const cur = textAreaRef.current
        const curVal = cur?.value
        console.log({cur, curVal})
        const addOnePostVariables: IAddOnePostVariables = {
            postInput: {text: curVal || ''}
        }
        const {data} = await addOnePost({variables: addOnePostVariables})
        textAreaRef.current!.value = '';
        const {addPost} = data!;
    }
    return (
        <div className="container">
            <div className="postForm">
                <form onSubmit={submitHandler}>
                    <textarea
                        ref={textAreaRef}
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
                            <Post key={post.id} post={post}/>
                        )
                    })}
                </InfiniteScroll>

            </div>
        </div>
    );
}


export default Feed;
