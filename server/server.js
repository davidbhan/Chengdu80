const { ApolloServer } = require("apollo-server-express");
import resolvers from "./resolvers";
import { typeDefs } from "./schema";
import { ElasticSearchClient } from "./services";

const ElasticSearch = ElasticSearchClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { ElasticSearch }
});

export default server;
