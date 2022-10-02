import {gql, QueryHookOptions, useQuery} from "@apollo/client";
import {fragments} from "../fragments";
import {IUser} from "../../models";


const SEARCH_USERS_WITH_PAGE_NUM_PAGE_SIZE_AND_TEXT = gql`
    query searchUsersWithPageNumPageSizeAndText($usersSearchInput: UsersSearchInput!) {
        usersSearch(usersSearchInput: $usersSearchInput) {
            users {
                id
                ...userAttributes
            }
        }
    }


    ${fragments.USER_ATTRIBUTES}
`;

export const getSearchUsersWithUsersSearchInputConfig: GetSearchUsersWithUsersSearchConfigFunType =
    (usersSearchInput) => {
        return {
            variables: {usersSearchInput},
            skip: usersSearchInput.text.length < 3
        }
    }


export const useQueryForSearchUserWithUsersSearchInput =
    (usersSearchInput: IUsersSearchInput) =>
        useQuery(SEARCH_USERS_WITH_PAGE_NUM_PAGE_SIZE_AND_TEXT, getSearchUsersWithUsersSearchInputConfig(usersSearchInput))

export type GetSearchUsersWithUsersSearchConfigFunType = (usersSearchInput: IUsersSearchInput) =>
    QueryHookOptions<IUsersSearchWithUsersSearchInputQueryResponse, IUsersSearchWithUsersSearchInputVariables>


export interface IUsersSearchWithUsersSearchInputFunResponse {
    users: IUser[]
}

export interface IUsersSearchWithUsersSearchInputQueryResponse {
    usersSearch: IUsersSearchWithUsersSearchInputFunResponse
}

export interface IUsersSearchWithUsersSearchInputVariables {
    usersSearchInput: IUsersSearchInput
}

export interface IUsersSearchInput {
    pageNum?: number;
    pageSize?: number;
    text: string
}