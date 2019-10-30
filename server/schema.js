import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Author {
    name: String
    institution: String
    interests: [String]
  }

  type Paper {
    title: String
    authors: [Author]
  }

  type Query {
    allPapers: [Paper]
  }
`;
