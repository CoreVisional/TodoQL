import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { port } from "../config/index";
import typeDefs from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import express from "express";
import cors from "cors";
import http from "http";
import { json } from "body-parser";
import verifyToken from "./graphql/context";
import cookieParser from "cookie-parser";

const app = express();

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: true,
    status400ForVariableCoercionErrors: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(cookieParser());

const startServer = async () => {
    try {
        await server.start();

        app.use(
            cors({
                origin: "*",
                credentials: true,
            }),
            json(),
            expressMiddleware(server, {
                context: async ({ req, res }) => {
                    // Get the JWT token from the cookie
                    const token = req.cookies.jwt;

                    // Verify the JWT token and obtain the user information
                    let user = null;
                    if (token) {
                        try {
                            user = await verifyToken(token);
                        } catch (err) {
                            console.error("Error verifying token:", err);
                        }
                    }

                    // Return the context object with the request, response, and user
                    return { req, res, user };
                },
            })
        );

        await new Promise((resolve) => {
            httpServer.listen({ port: port }, resolve);
        });

        console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    } catch (error) {
        console.log(error);
    }
};

startServer();
