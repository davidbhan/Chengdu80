import { processPaperSource } from "../utils";

export const Author = {
  papers: async ({ id }, {}, { authorPapersLoader }) => {
    const papers = await authorPapersLoader.load(id);
    return papers.map(({ _source }) => processPaperSource(_source));
  }
};
