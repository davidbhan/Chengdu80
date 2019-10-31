const { ApolloServer } = require("apollo-server-express");
import resolvers from "./resolvers";
import { typeDefs } from "./schema";
import { ElasticSearchClient } from "./services";
import { authorPapersLoader, fieldPapersLoader, authorsLoader } from "./utils";

const ElasticSearch = ElasticSearchClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    ElasticSearch,
    authorPapersLoader: authorPapersLoader(ElasticSearch),
    fieldPapersLoader: fieldPapersLoader(ElasticSearch),
    authorsLoader: authorsLoader(ElasticSearch)
  }
});

export default server;
