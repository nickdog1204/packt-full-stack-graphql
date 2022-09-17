export interface IPost {
    id: number;
    text: string;
    user: IUser;
}

export interface IUser {
    avatar: string;
    username: string;
}

export interface IPostsResponse {
    posts: [IPost];
}