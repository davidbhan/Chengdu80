import moment from "moment";

export const topic_trend_process = ({
  key_as_string,
  key,
  doc_count,
  no_of_citations
}) => ({
  year: moment(key_as_string).format("YYYY"),
  citations: no_of_citations.value
});
