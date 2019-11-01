import { processPaperSource } from "../../utils";

export const paper = async (parent, { id }, { ElasticSearch }) => {
  const papers = await ElasticSearch.papers({
    query: {
      match: {
        _id: {
          query: id
        }
      }
    }
  });
  return papers.map(({ _source }) => processPaperSource(_source))[0];
};
