import DataLoader from "dataloader";

const findFieldPapers = (ElasticSearch, fields) => {
  return ElasticSearch.papers({
    query: {
      bool: {
        should: fields.map(field => ({
          match_phrase: {
            fields_of_study: field
          }
        })),
        minimum_should_match: 1
      }
    }
  }).then(papers => {
    const papersByFields = {};
    for (const field of fields) {
      papersByFields[field] = [];
    }
    for (const paper of papers) {
      for (const paper_field of paper._source.fields_of_study) {
        if (paper_field in papersByFields) {
          papersByFields[paper_field].push(paper);
        }
      }
    }
    return fields.map(field => papersByFields[field]);
  });
};

export const fieldPapersLoader = ElasticSearch =>
  new DataLoader(fields => findFieldPapers(ElasticSearch, fields));
