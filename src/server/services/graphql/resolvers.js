const logger = require('../../helpers/logger');


module.exports = function resolvers() {
    const {db} = this;
    const {Post, User, Chat, Message} = db.models;
    const resolvers = {
        RootQuery: {
            posts(root, args, context) {
                return Post.findAll({order: [['createdAt', 'DESC']]});
            },
            async chats(root, args, context) {
                const users = await User.findAll();
                if (!users.length) {
                    return [];
                }
                const firstUserRow = users[0];
                return Chat.findAll({
                    include: [
                        {
                            model: User,
                            required: true,
                            through: {where: {userId: firstUserRow.id}}
                        },
                        {
                            model: Message
                        }
                    ]

                })

            },
            async chat(root, {chatId}, context) {
                return Chat.findByPk(chatId, {
                    include: [
                        {
                            model: User,
                            required: true
                        },
                        {
                            model: Message
                        }

                    ]
                })

            }
        },
        RootMutation: {
            async addPost(root, {post}, context) {
                const users = await User.findAll();
                const usersRow = users[0];
                const newPost = await Post.create({
                    ...post
                })
                await Promise.all([
                    newPost.setUser(usersRow.id),
                ])
                logger.log({
                    level: 'info',
                    message: 'Post was created',
                })
                return newPost;
            },
            async addChat(root, {chat}, context) {
                const newChat = await Chat.create();
                await Promise.all([
                    newChat.setUsers(chat.userIds)
                ])
                logger.log({
                    level: 'info',
                    message: 'New chat was created'
                })
                return newChat;
            },
            async addMessage(root, {message}, context) {
                const [firstUserRow] = await User.findAll();
                const newMessage = await Message.create({
                    ...message
                });
                await Promise.all([
                    newMessage.setUser(firstUserRow.id),
                    newMessage.setChat(message.chatId)
                ])
                logger.log({
                    level: 'info',
                    message: 'New message was created'
                })
                return newMessage;

            }
        },
        Post: {
            user(post, args, context) {
                return post.getUser();
            }
        },
        Message: {
            async user(message, args, context) {
                return message.getUser();
            },
            async chat(message, args, context) {
                return message.getChat();
            }
        },
        Chat: {
            async messages(chat, args, context) {
                return chat.getMessages({order: [['id', 'ASC']]});
            },
            async users(chat, args, context) {
                return chat.getUsers();
            }
        }
    };
    return resolvers;
}

