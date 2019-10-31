function generate_weights_datastructure(data) {
  const weights = {
    papers_ids: {},
    unified_keywords: {},
    expertise: {}
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

  data.authors.forEach(author => {
    author.expertise.forEach(area => {
      if (weights.expertise.hasOwnProperty(area)) {
        weights.expertise[area] += 1;
      } else {
        weights.expertise[area] = 1;
      }
    });
    author.custom_keywords.forEach(key => {
      if (weights.unified_keywords.hasOwnProperty(key)) {
        weights.unified_keywords[key] += 1;
      } else {
        weights.unified_keywords[key] = 1;
      }
    });
    author.fields_of_study.forEach(key => {
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

  return {
    query: {
      function_score: {
        query: {
          multi_match: {
            query: original_keyword,
            fields: ["abstract", "fields_of_study^2", "title^3"],
            fuzziness: "AUTO"
          }
        },
        functions: custom_keywords
      }
    }
  };
}

export const generate_elastic_query_author = (
  original_keyword,
  sorted_weights
) => {
  let expertise_arr = [];
  const weights_fos = [50, 40, 30, 20, 10];
  const weights_expertise = [150, 120, 90, 60, 30];

  sorted_weights.expertise &&
    sorted_weights.expertise.forEach(function(item, index) {
      const temp_expertise = {
        filter: { match: { expertise: item[0] } },
        weight: weights_expertise[index]
      };
      expertise_arr.push(temp_expertise);
    });

  if (sorted_weights.unified_keywords[0] !== "") {
    sorted_weights.unified_keywords &&
      sorted_weights.unified_keywords.forEach(function(item, index) {
        const temp_fields_of_study = {
          filter: { match: { fields_of_study: item[0] } },
          weight: weights_fos[index]
        };
        const temp_custom_keywords = {
          filter: { match: { custom_keywords: item[0] } },
          weight: weights_fos[index]
        };

        expertise_arr.push(temp_fields_of_study);
        expertise_arr.push(temp_custom_keywords);
      });
  }

  return {
    query: {
      function_score: {
        query: {
          multi_match: {
            query: original_keyword,
            fields: [
              "expertise^3",
              "fields_of_study^2",
              "custom_keywords^2",
              "author_name^5"
            ],
            fuzziness: "AUTO"
          }
        },
        functions: expertise_arr
      }
    }
  };
};

export const recommendationEngine = (queryString, data = []) => {
  const sorted_weights = generate_weights_datastructure(data);
  return generate_elastic_query(queryString, sorted_weights);
};
