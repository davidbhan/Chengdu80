export const processAuthorSource = ({
  author_id,
  author_name,
  institution_id,
  institution_name
}) => ({
  id: author_id,
  name: author_name,
  institution: {
    id: institution_id,
    name: institution_name
  }
});
