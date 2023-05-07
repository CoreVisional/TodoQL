import gql from "graphql-tag";
import { DateTimeTypeDefinition } from "graphql-scalars";

const types = gql`
    ${DateTimeTypeDefinition}
`;

export default types;
