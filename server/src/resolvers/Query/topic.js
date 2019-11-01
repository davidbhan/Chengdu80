import { topic_trend_process } from "../../utils/topics";

export const topic = (parent, { name }) => {
  return {
    name
  };
};

export const topicAggregateCitations = async (
  parent,
  { topic },
  { ElasticSearch }
) => {
  const data = await ElasticSearch.papersaggs({
    aggs: {
      years: {
        date_histogram: {
          field: "venue.venue_published_date",
          interval: "1y",
          time_zone: "Asia/Shanghai",
          min_doc_count: 1
        },
        aggs: {
          no_of_citations: {
            sum: {
              field: "citation_count"
            }
          }
        }
      }
    },
    size: 0,
    _source: {
      excludes: []
    },
    stored_fields: ["*"],
    script_fields: {},
    docvalue_fields: [
      {
        field: "venue.venue_published_date",
        format: "date_time"
      }
    ],
    query: {
      bool: {
        must: [
          {
            match_phrase: {
              fields_of_study: {
                query: topic
              }
            }
          },
          {
            match_phrase: {
              fields_of_study: {
                query: topic
              }
            }
          }
        ],
        filter: [
          {
            match_all: {}
          },
          {
            match_all: {}
          }
        ],
        should: [],
        must_not: []
      }
    }
  });
  const { buckets } = data.years;
  return buckets.map(topic_trend_process);
};

const meanQuery = () => {
  return {
    aggs: {
      data: {
        extended_stats: {
          field: "citation_count"
        }
      }
    },
    size: 0,
    _source: {
      excludes: []
    },
    stored_fields: ["*"],
    script_fields: {},
    docvalue_fields: [
      {
        field: "venue.venue_published_date",
        format: "date_time"
      }
    ],
    query: {
      bool: {
        must: [
          {
            match_phrase: {
              fields_of_study: {
                query: "Machine Learning"
              }
            }
          },
          {
            match_phrase: {
              fields_of_study: {
                query: "Machine Learning"
              }
            }
          }
        ],
        filter: [
          {
            match_all: {}
          },
          {
            match_all: {}
          }
        ],
        should: [],
        must_not: []
      }
    }
  };
};
