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
