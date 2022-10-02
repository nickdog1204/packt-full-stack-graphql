const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: Int
        avatar: String
        username: String
    }
    type UsersSearchResponse {
        users: [User]
    }
    type Post {
        id: Int
        text: String
        user: User
    }
    type Message {
        id: Int
        text: String
        user: User
        chat: Chat
    }
    type Chat {
        id: Int
        messages: [Message]
        users: [User]
        lastMessage: Message
    }
    input UsersSearchInput {
        pageNum: Int
        pageSize: Int,
        text: String!
    }

    type RootQuery {
        posts: [Post]
        postsFeed(pageNum: Int, pageSize: Int): PostFeed
        chats: [Chat]
        chat(chatId: Int!): Chat
        usersSearch(
            usersSearchInput: UsersSearchInput
        ): UsersSearchResponse
    }
    type PostFeed {
        posts: [Post]
    }

    input PostInput {
        text: String!
    }
    input UserInput {
        username: String!
        avatar: String!
    }
    input ChatInput {
        userIds: [Int!]!
    }
    input MessageInput {
        text: String!
        chatId: Int!
    }
    type DeletePostResponse {
        success: Boolean!
    }

    type RootMutation {
        addPost(
            post: PostInput!
        ): Post
        addChat(
            chat: ChatInput!
        ): Chat
        addMessage(
            message: MessageInput!
        ): Message
        deletePost(
            postId: Int!
        ): DeletePostResponse
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;

module.exports = [typeDefs];