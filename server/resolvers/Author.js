import { processPaperSource } from "../utils";
import { flatten } from "lodash";

export const Author = {
  name: async ({ id, name }, {}, { authorPapersLoader }) => {
    if (name === undefined || name === null) {
      const papers = await authorPapersLoader.load(id);
      if (papers.length) {
        const author = flatten(
          papers.map(paper => paper._source.author_list)
        ).find(
          author =>
            `${author.author_id}` === `${id}` && author.author_name !== null
        );
        if (author) {
          return author.author_name;
        }
      }
    }
    return name;
  },
  institution: async ({ id, institution }, {}, { authorPapersLoader }) => {
    if (
      institution === undefined ||
      institution === null ||
      institution.name === undefined ||
      institution.name === null
    ) {
      const papers = await authorPapersLoader.load(id);
      if (papers.length) {
        const author = flatten(
          papers.map(paper => paper._source.author_list)
        ).find(
          author =>
            `${author.author_id}` === `${id}` &&
            author.institution_name !== null
        );
        if (author) {
          return {
            id: author.institution_id,
            name: author.institution_name
          };
        }
      }
      return {};
    }
    return institution;
  },
  papers: async ({ id }, {}, { authorPapersLoader }) => {
    const papers = await authorPapersLoader.load(id);
    return papers.map(({ _source }) => processPaperSource(_source));
  }
};
