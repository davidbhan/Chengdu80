import { ApolloServer, gql } from "apollo-server";
import { resolvers } from "./resolvers/Query";
import { typeDefs } from "./schema";

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
