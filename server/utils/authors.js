import DataLoader from "dataloader";

export const processAuthorSource = ({
  author_id,
  author_name,
  institution_id,
  institution_name,
  image_url,
  prestige_score,
  citation_count,
  fields_of_study
}) => ({
  id: author_id,
  name: author_name,
  institution: {
    id: institution_id,
    name: institution_name
  },
  image: image_url,
  prestigeScore: prestige_score,
  citationCount: citation_count,
  interests: fields_of_study
});

const findAuthors = (ElasticSearch, author_ids) => {
  return ElasticSearch.authors({
    size: 5 * author_ids.length,
    query: {
      bool: {
        should: author_ids.map(id => ({
          match_phrase: {
            author_id: id
          }
        })),
        minimum_should_match: 1
      }
    }
  }).then(authors => {
    const authorsData = {};
    for (const author of authors) {
      authorsData[author._source.author_id] = author;
    }
    return author_ids.map(author_id => authorsData[author_id]);
  });
};

export const authorsLoader = ElasticSearch =>
  new DataLoader(author_ids => findAuthors(ElasticSearch, author_ids));
