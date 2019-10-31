import ElasticSearch from "elasticsearch";

export const ElasticSearchClient = () => {
  const client = new ElasticSearch.Client({
    hosts: [
      "https://search-gp06chengdu80-37opvyh5nd4c4qqyuviicsouvy.us-east-2.es.amazonaws.com"
    ]
  });

  client.ping(
    {
      requestTimeout: 30000
    },
    function(error) {
      error
        ? console.error("ElasticSearch cluster is down!")
        : console.log("ElasticSearch is ok");
    }
  );

  const elasticSearchSchema = {
    size: 10,
    from: 0,
    query: {
      match_all: {}
    }
  };

  return {
    client,
    papers: (body = {}) =>
      client
        .search({
          index: "relevantpapers",
          body: { ...elasticSearchSchema, ...body }
        })
        .then(response => response["hits"]["hits"]),
    authors: (body = {}) =>
      client
        .search({
          index: "cleanfaculty",
          body: { ...elasticSearchSchema, ...body }
        })
        .then(response => response["hits"]["hits"])
  };
};
