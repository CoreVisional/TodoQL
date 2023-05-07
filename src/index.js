import { ApolloServer } from "@apollo/server";
import { port } from "../config/index";
import typeDefs from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: true,
    status400ForVariableCoercionErrors: true,
});

const startServer = async () => {
    try {
        const { url } = await startStandaloneServer(server, {
            listen: { port: port },
        });

        console.log(`${"🚀 Server ready at:"} ${url}api`);
    } catch (error) {
        console.log(error);
    }
};

startServer();
