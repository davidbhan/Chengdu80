import { processAuthorSource } from "../../utils";

export const author = async (parent, { id }, { authorsLoader }) => {
  const author = await authorsLoader.load(id);
  return processAuthorSource(author._source);
};
