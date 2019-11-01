import { processPaperSource } from "../../utils";
import {
  recommendationEngine,
  generate_elastic_query_author
} from "../../services/recommendation_query_engine";
import { processAuthorSource } from "../../utils";

export const search = async (
  parent,
  { query, paperIds, authorIds, topics },
  { ElasticSearch, authorsLoader }
) => {
  const papersData = paperIds.length
    ? (await ElasticSearch.papers({
        query: {
          bool: {
            should: paperIds.map(id => ({
              match_phrase: {
                _id: id
              }
            })),
            minimum_should_match: 1
          }
        }
      })).map(paper => paper._source)
    : [];

  const authorsData = authorIds.length
    ? (await ElasticSearch.authors({
        query: {
          bool: {
            should: authorIds.map(id => ({
              match_phrase: {
                author_id: id
              }
            })),
            minimum_should_match: 1
          }
        }
      })).map(author => author._source)
    : [];

  const data = {
    papers: papersData,
    authors: authorsData,
    unified_keywords: topics
  };

  const esQuery = recommendationEngine(query, data);
  const papers = await ElasticSearch.papers(esQuery);
  const results = papers.map(({ _source }) => processPaperSource(_source));
  const authorQuery = generate_elastic_query_author(query, data);
  const author_result = await ElasticSearch.authors(authorQuery);
  const authors = author_result.map(({ _source }) =>
    processAuthorSource(_source)
  );
  //console.log(authors);
  return { papers: results, authors: authors, topics: null };
};
