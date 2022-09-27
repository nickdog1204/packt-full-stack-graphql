const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: Int
        avatar: String
        username: String
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

    type RootQuery {
        posts: [Post]
        postsFeed(pageNum: Int, pageSize: Int): PostFeed
        chats: [Chat]
        chat(chatId: Int!): Chat
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
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;

module.exports = [typeDefs];