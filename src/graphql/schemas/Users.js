import gql from "graphql-tag";

const schema = gql`
    type User {
        id: ID!
        email: String!
        created_at: DateTime
        updated_at: DateTime
        notes: [Note!]
    }

    extend type Query {
        allUsers: [User!]
    }

    extend type Mutation {
        register(input: RegisterInput!): RegisterResponse
        login(input: LoginInput!): LoginResponse
    }

    type RegisterResponse {
        email: String!
    }

    input RegisterInput {
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type LoginResponse {
        id: ID!
        email: String!
        token: String!
    }
`;

export default schema;
