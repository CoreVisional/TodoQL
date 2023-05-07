import gql from "graphql-tag";

const schema = gql`
    type Note {
        id: ID!
        content: String!
        user: User!
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }

    extend type Query {
        ownNotes: [Note!]
        allNotes: [Note!]
        noteById(id: ID!): Note!
    }

    extend type Mutation {
        createNote(input: CreateNoteInput!): NoteMutationResponse
        updateNote(input: UpdateNoteInput!): NoteMutationResponse
        deleteNote(id: ID!): NoteMutationResponse
    }

    type NoteMutationResponse {
        status: String!
        id: ID!
        content: String!
        created_at: DateTime!
    }

    input CreateNoteInput {
        content: String!
    }

    input UpdateNoteInput {
        id: ID!
        content: String!
    }
`;

export default schema;
