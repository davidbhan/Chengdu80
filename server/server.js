const { ApolloServer } = require("apollo-server-express");
import resolvers from "./resolvers";
import { typeDefs } from "./schema";
import { ElasticSearchClient } from "./services";
import { authorPaperLoader } from "./utils";

const ElasticSearch = ElasticSearchClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    ElasticSearch,
    authorPaperLoader: authorPaperLoader(ElasticSearch)
  }
});

export default server;
