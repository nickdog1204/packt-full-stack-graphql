const graphql = require("./graphql");

module.exports = utils => ({
    graphql: graphql(utils)
})