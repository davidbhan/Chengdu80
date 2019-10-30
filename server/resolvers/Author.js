import { processPaperSource } from "../utils";

export const Author = {
  papers: async ({ id }, {}, { ElasticSearch, authorPaperLoader }) => {
    const papers = await authorPaperLoader.load(id);
    return papers.map(({ _source }) => processPaperSource(_source));
  }
};
