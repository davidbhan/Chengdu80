function generate_weights_datastructure(data) {
  const weights = {
    papers_ids: {},
    unified_keywords: {}
  };

  if (data.length === 0) return {};
  data.papers.forEach(paper => {
    if (weights.papers_ids.hasOwnProperty(paper.id)) {
      weights.papers_ids[paper.id] += 1;
    } else {
      weights.papers_ids[paper.id] = 1;
    }
    paper.fields_of_study.forEach(key => {
      if (weights.unified_keywords.hasOwnProperty(key)) {
        weights.unified_keywords[key] += 1;
      } else {
        weights.unified_keywords[key] = 1;
      }
    });
    paper.custom_keywords.forEach(key => {
      if (weights.unified_keywords.hasOwnProperty(key)) {
        weights.unified_keywords[key] += 1;
      } else {
        weights.unified_keywords[key] = 1;
      }
    });
  });

  data.unified_keywords.forEach(key => {
    if (weights.unified_keywords.hasOwnProperty(key)) {
      weights.unified_keywords[key] += 1;
    } else {
      weights.unified_keywords[key] = 1;
    }
  });

  let sorted_weights = {};

  Object.keys(weights).forEach(attribute => {
    let sortable = [];
    Object.keys(weights[attribute]).forEach(id => {
      sortable.push([id, weights[attribute][id]]);
    });
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    sorted_weights[attribute] = sortable.slice(0, 5);
  });

  return sorted_weights;
}

function generate_elastic_query(original_keyword, sorted_weights) {
  let custom_keywords = [];
  const weights_abstract = [50, 40, 30, 20, 10];
  const weights_title = [150, 120, 90, 60, 30];
  sorted_weights.unified_keywords &&
    sorted_weights.unified_keywords.forEach(function(item, index) {
      //console.log(item, index);
      const temp_abs = {
        filter: { match: { abstract: item[0] } },
        weight: weights_abstract[index]
      };
      const temp_title = {
        filter: { match: { title: item[0] } },
        weight: weights_title[index]
      };
      custom_keywords.push(temp_abs);
      custom_keywords.push(temp_title);
    });
  sorted_weights.papers_ids &&
    sorted_weights.papers_ids.forEach(function(item, index) {
      temp_id = { 
          "filter": { "match": { "_id": item[0] } },
          "weight": weights_title[index]
      };
      custom_keywords.push(temp_id);
    });

  return {
    query: {
      function_score: {
        query: {
          multi_match: {
            query: original_keyword,
            fields: ["abstract", "fields_of_study^2", "title^3"]
          }
        },
        functions: custom_keywords
      }
    }
  };
}

export const recommendationEngine = (queryString, data = []) => {
  const sorted_weights = generate_weights_datastructure(data);
  const esQuery = generate_elastic_query(queryString, sorted_weights);
  return esQuery;
};
