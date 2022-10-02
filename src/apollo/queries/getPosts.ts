import {gql} from "@apollo/client";
import {USER_ATTRIBUTES} from "../fragments/userAttributes";


export const GET_POSTS_WITH_PAGE_NUM_AND_PAGE_SIZE = gql`
    query getPostsWithPageNumAndPageSize($pageNum: Int, $pageSize: Int) {
        postsFeed(pageNum: $pageNum, pageSize: $pageSize) {
            posts {
                id
                text
                user {
                    ...userAttributes
                }
            }
        }
    }
    ${USER_ATTRIBUTES}
`;

