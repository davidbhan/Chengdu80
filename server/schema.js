import { gql } from "apollo-server";

export const typeDefs = gql`
  type Topic {
    name: String
    papers: [Paper]
  }

  type Institution {
    id: ID
    name: String
  }

  type Author {
    id: ID
    name: String
    institution: Institution
    interests: [String]
    papers: [Paper]
  }

  type Paper {
    id: ID
    title: String
    abstract: String
    topics: [Topic]
    keywords: [String]
    authors: [Author]
    publishedDate: String
  }

  type Result {
    papers: [Paper]
    authors: [Author]
    topics: [Topic]
  }

  type Query {
    search(
      query: String
      paperIds: [String] = []
      authorIds: [String] = []
      topics: [String] = []
    ): Result
    paper(id: ID!): Paper
    author(id: ID!): Author
    topic(name: String!): Topic
  }
`;
