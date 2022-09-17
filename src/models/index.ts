export interface IPost {
    id: number;
    text: string;
    user: IUser;
}

export interface IUser {
    avatar: string;
    username: string;
}

export interface IQueryPostsResponse {
    posts: IPost[];
}

export interface IPostInput {
    text: string;
}

export interface IAddOnePostVariables {
    postInput: IPostInput
}

export interface IAddOnePostResponse {
    addPost: IPost
}