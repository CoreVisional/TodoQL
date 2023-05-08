import gql from "graphql-tag";
import paramTypes from "./Params";
import userType from "./Users";
import noteType from "./Notes";

const typeDefs = gql`

    type Query {
        root: String
    },

    type Mutation {
        root: String
    }
`;

export default [
    typeDefs,
    paramTypes,
    userType,
    noteType,
];
