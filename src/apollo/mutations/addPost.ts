import {gql, MutationHookOptions, useMutation} from "@apollo/client";
import {USER_ATTRIBUTES} from "../fragments/userAttributes";
import {IAddOnePostResponse, IAddOnePostVariables} from "../../models";
import {fragments} from "../fragments";


const ADD_POST_WITH_POST_INPUT = gql`
    mutation addPostWithPostInput($postInput: PostInput!) {
        addPost(post: $postInput) {
            id
            text
            user {
                ...userAttributes
            }

        }
    }
    ${USER_ATTRIBUTES}
`
const getAddPostWithPostInputConfig: () => MutationHookOptions<IAddOnePostResponse, IAddOnePostVariables> = () => ({
    update: (cache, {data}) => {
        if (!data) {
            console.log('EMMMPPPPPTYYYYY DATA')
            return;
        }
        const {addPost} = data;


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

})
export const useAddPostMutation = () => useMutation<IAddOnePostResponse, IAddOnePostVariables>(ADD_POST_WITH_POST_INPUT, getAddPostWithPostInputConfig())