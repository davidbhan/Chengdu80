import { processAuthorSource } from "../../utils";
import { flatten } from "lodash";

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
  if (!authors.length) {
    return {
      id
    };
  }
  return authors.map(({ _source }) => processAuthorSource(_source))[0];
};
