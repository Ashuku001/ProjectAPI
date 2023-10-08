const graphQLClient = require("./graphqlClient/graphqlClient.js")
const { gql } = require("graphql-request");

const query = gql`
  mutation AddMessage($message: MessageInput!, $participants: ParticipantsInput) {
    addMessage(message: $message, participants: $participants) {
      id
      from_customer
      text
      timestamp
      createdAt
    }
  }
`;

async function saveMessageToDatabase(data) {
    const variables = data
    try{
      const results = await graphQLClient.request(query, variables)
      console.log("RESULTS FROM ADDING TO DB", results)
      return
    } catch(error) {
      console.log("there was an error saving to the database", error)
    }
}

if (exports){
  exports.saveMessageToDatabase = saveMessageToDatabase
}