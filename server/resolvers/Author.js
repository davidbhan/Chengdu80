import { processPaperSource } from "../utils";

export const Author = {
  papers: async ({ id }, {}, { ElasticSearch }) => {
    const papers = await ElasticSearch.papers({
      query: {
        match: {
          "author_list.author_id": id
        }
      }
    });
    return papers.map(({ _source }) => processPaperSource(_source));
  }
};
