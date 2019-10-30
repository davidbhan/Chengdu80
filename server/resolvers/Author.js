import { processPaperSource } from "../utils";

export const Author = {
  papers: async ({ id }, {}, { authorPaperLoader }) => {
    const papers = await authorPaperLoader.load(id);
    return papers.map(({ _source }) => processPaperSource(_source));
  }
};
