import DataLoader from "dataloader";

export const processPaperSource = ({
  title,
  abstract,
  fields_of_study,
  author_list,
  venue: { venue_published_date },
  paper_id
}) => ({
  id: paper_id,
  title,
  abstract,
  topics: fields_of_study.map(name => ({ name })),
  authors: author_list.map(({ author_id, author_name }) => ({
    id: author_id,
    name: author_name
  })),
  publishedDate: venue_published_date
});

const findAuthorPapers = (ElasticSearch, author_ids) => {
  return ElasticSearch.papers({
    query: {
      bool: {
        should: author_ids.map(id => ({
          match_phrase: {
            "author_list.author_id": id
          }
        })),
        minimum_should_match: 1
      }
    }
  }).then(papers => {
    const papersByAuthors = {};
    for (const author_id of author_ids) {
      papersByAuthors[author_id] = [];
    }
    for (const paper of papers) {
      for (const paper_author of paper._source.author_list) {
        const paper_author_id = paper_author["author_id"];
        if (paper_author_id in papersByAuthors) {
          papersByAuthors[paper_author_id].push(paper);
        }
      }
    }
    return author_ids.map(author_id => papersByAuthors[author_id]);
  });
};

export const authorPaperLoader = ElasticSearch =>
  new DataLoader(author_ids => findAuthorPapers(ElasticSearch, author_ids));
