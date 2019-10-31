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
    image: String
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

  type TopicCitationByYear {
    year: String
    citations: Int
  }

  type Query {
    search(
      query: String
      paperIds: [ID] = []
      authorIds: [ID] = []
      topics: [String] = []
    ): Result
    paper(id: ID!): Paper
    author(id: ID!): Author
    topic(name: String!): Topic
    topicAggregateCitations(topic: String): [TopicCitationByYear]
  }
`;
