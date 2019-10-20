const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Info {
        _id: ID!
        applicationName: String!
        createdBy: String!
        description: String!
        examplePlayer: Player 
    }

    type Player {
        _id: ID!
        name: String!
        firstName: String!
        lastName: String!
        dateOfBirth: String!
        countryOfBirth: String!
        nationality: String!
        position: String!
        shirtNumber: Int!
        lastUpdated: String!
    }

    type RootQuery {
        getInfo: Info!
    }

    type RootMutation {
        sendInfo: String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);