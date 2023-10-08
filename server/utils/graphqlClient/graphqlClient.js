
const { GraphQLClient } = require("graphql-request");
const graphQLClient = new GraphQLClient(process.env.GRAPHQLURI, {
  headers: {
    "content-type": "application/json",
  },
});

module.exports = graphQLClient