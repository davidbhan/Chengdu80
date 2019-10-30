import { gql } from "apollo-server";

export const typeDefs = gql`
  type Topic {
    name: String
    papers: [Paper]
  }

  type Author {
    name: String
    institution: String
    interests: [String]
  }

  type Paper {
    title: String
    abstract: String
    topics: [Topic]
    authors: [Author]
    publishedDate: String
  }

  type Query {
    allPapers: [Paper]
  }
`;
