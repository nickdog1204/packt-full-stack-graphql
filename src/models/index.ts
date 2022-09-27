export interface IPost {
    id: number;
    text: string;
    user: IUser;
}

export interface IUser {
    id: number;
    avatar?: string;
    username?: string;
}

export interface IQueryPostsResponse {
    posts: IPost[];
}

export interface IPostFeed extends IQueryPostsResponse {
    __typename?: string;
}
export interface IQueryPostsFeedResponse {
    __typename?: string;
    postsFeed: IPostFeed
}
export interface IQueryPostsFeedVariables {
    pageNum: number;
    pageSize: number;
}


export interface IQueryChatsResponse {
    chats: IChat[];
}

export interface IQueryChatResponse {
    chat: IChat;
}

export interface IPostInput {
    text: string;
}

export interface IMessageInput {
    text: string;
    chatId: number;
}

export interface IAddOnePostVariables {
    postInput: IPostInput
}

export interface IQueryChatVariables {
    chatId: number
}

export interface IAddOnePostResponse {
    addPost: IPost
}

export interface IAddMessageVariables {
    messageInput: IMessageInput
}

export interface IAddMessageResponse {
    addMessage: IMessage
}

export interface IChat {
    id: number;
    users?: IUser[];
    messages?: IMessage[];
    lastMessage?: IMessage;
}

export interface IMessage {
    id: number;
    text: string;
    user?: IUser;
    chat?: IChat;
}