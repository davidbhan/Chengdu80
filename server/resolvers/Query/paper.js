import { processPaperSource } from "../../utils";

export const allPapers = async (parent, {}, { ElasticSearch }) => {
  const papers = await ElasticSearch.papers();
  return papers.map(({ _source }) => processPaperSource(_source));
};
