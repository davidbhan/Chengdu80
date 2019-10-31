import { processAuthorSource } from "../../utils";

export const author = async (parent, { id }, { ElasticSearch }) => {
  const authors = await ElasticSearch.authors({
    query: {
      match: {
        _id: {
          query: id
        }
      }
    }
  });
  return authors.map(({ _source }) => processAuthorSource(_source))[0];
};
