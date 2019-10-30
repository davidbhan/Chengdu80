import { processPaperSource } from "../../utils";

export const search = async (parent, { query }, { ElasticSearch }) => {
  const papers = await ElasticSearch.papers({
    query: {
      multi_match: {
        query,
        fields: ["title", "abstract", "fields_of_study", "author_list"]
      }
    }
  });

  const results = papers.map(({ _source }) => processPaperSource(_source));
  return { papers: results, authors: null, topics: null };
};
