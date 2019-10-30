export const allPapers = async (parent, {}, { ElasticSearch }) => {
  const papers = await ElasticSearch.papers();
  return papers.map(({ _source: { title, abstract } }) => ({
    title,
    abstract
  }));
};
