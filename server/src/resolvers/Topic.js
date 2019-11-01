import { processPaperSource } from "../utils";

export const Topic = {
  papers: async ({ name }, {}, { fieldPapersLoader }) => {
    const papers = await fieldPapersLoader.load(name);
    return papers.map(({ _source }) => processPaperSource(_source));
  }
};
