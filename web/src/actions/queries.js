import { PAPERS_QUERY } from "../features/CurateResults/Paper";

export const GET_AUTHOR = id => `
    query {
    author(id: "${id}"){
      id
      name
      image
      institution {
        id
        name
      }
      prestigeScore
      citationCount
      interests
      ${PAPERS_QUERY}
    }
  }
`;

export const GET_AUTHOR_NETWORK = id => `
    query {
    author(id: "${id}"){
      id
      name
      prestigeScore
      citationCount
      papers {
        id
        authors {
          id
          name
          prestigeScore
          citationCount
          papers {
            id
            authors {
              id
              name
              prestigeScore
              citationCount
            }
          }
        }
      }
    }
  }
`;

export const GET_TOPIC = topic => `query {
    topic(name: "${topic}"){
      name
      ${PAPERS_QUERY}
    }
  }`;

export const GET_SEARCH = (paperIds, authorIds, topics, searchQuery) => `query {
    search(query: "${searchQuery}", paperIds: [${paperIds}], authorIds: [${authorIds}], topics: ["${topics}"]){
      ${PAPERS_QUERY}
      authors {
        id
        name
        image
        institution {
          id
          name
        }
        prestigeScore
        citationCount
        interests
      }
    }
  }`;

export const GET_TOPIC_TREND = topic => `query{
      topicAggregateCitations(topic:"${topic}"){
        year
        citations
      }
}`;
