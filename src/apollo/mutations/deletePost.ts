import {gql, MutationHookOptions, useMutation} from "@apollo/client";

const DELETE_POST_BY_POST_ID = gql`
    mutation deletePostByPostId($postId: Int!) {
        deletePost(postId: $postId) {
            success
        }
    }
`
const getDeletePostConfig: GetDeletePostConfigFunType = (postId: number) => {
    return {
        update(cache, {data}) {
            if (data) {
                const {deletePost: {success}} = data;
                if (success) {
                    cache.modify({
                        fields: {
                            postsFeed(postsFeed, {readField}) {
                                return {
                                    ...postsFeed,
                                    posts: postsFeed.posts.filter((postRef: any) => postId !== readField('id', postRef))
                                }

                            }
                        }
                    })
                }
            }
        }
    }

}
export const useDeletePostMutation = (postId: number) =>
    useMutation(
        DELETE_POST_BY_POST_ID,
        getDeletePostConfig(postId)
    )

type GetDeletePostConfigFunType = (postId: number) => DeletePostMutationConfig;

type DeletePostMutationConfig = MutationHookOptions<IDeletePostResponse, IDeletePostVariables>;


export interface IDeletePostResponse {
    deletePost: {
        success: boolean
    }
}

export interface IDeletePostVariables {
    postId: number
}