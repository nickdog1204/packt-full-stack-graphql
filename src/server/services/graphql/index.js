const {ApolloServer} = require('apollo-server-express')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

module.exports = utils => {
    const executableSchema = makeExecutableSchema({
        typeDefs,
        resolvers: resolvers.call(utils)
    })

    const server = new ApolloServer({
        schema: executableSchema,
        context: ({req}) => req
    })

    return server;

}
