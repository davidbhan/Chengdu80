import { processPaperSource } from "../utils";

export const Author = {
  papers: async ({ id }, {}, { authorPapersLoader }) => {
    const papers = await authorPapersLoader.load(id);
    return papers.map(({ _source }) => processPaperSource(_source));
  },
  prestigeScore: async ({ id, prestigeScore }, {}, { authorsLoader }) => {
    if (prestigeScore) {
      return prestigeScore;
    }
    const author = await authorsLoader.load(id);
    return author._source.prestige_score;
  },
  citationCount: async ({ id, citationCount }, {}, { authorsLoader }) => {
    if (citationCount) {
      return citationCount;
    }
    const author = await authorsLoader.load(id);
    return author._source.citation_count;
  }
};
