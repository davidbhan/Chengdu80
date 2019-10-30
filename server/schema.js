import { gql } from "apollo-server";

export const typeDefs = gql`
  type Topic {
    name: String
    papers: [Paper]
  }

  type Author {
    id: ID
    name: String
    institution: String
    interests: [String]
    papers: [Paper]
  }

  type Paper {
    id: ID
    title: String
    abstract: String
    topics: [Topic]
    authors: [Author]
    publishedDate: String
  }

  type Result {
    papers: [Paper]
    authors: [Author]
    topics: [Topic]
  }

  type Query {
    search(query: String): Result
    paper(id: ID!): Paper
    author(id: ID!): Author
  }
`;
