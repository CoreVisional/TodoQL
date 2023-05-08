import { ApolloServer } from "@apollo/server";
import { port } from "../config/index";
import typeDefs from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import verifyToken from "./graphql/context";

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
            context: async ({ req, res }) => {
                const authHeader = req.headers.authorization || "";

                // Check for Bearer token
                if (authHeader && authHeader.startsWith("Bearer ")) {
                    const token = authHeader.split(" ")[1];
                    const user = await verifyToken(token);
                    return { res, user };
                }

                return { res };
            },
        });

        console.log(`${"🚀 Server ready at:"} ${url}api`);
    } catch (error) {
        console.log(error);
    }
};

startServer();
