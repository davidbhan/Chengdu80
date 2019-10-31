
data = {
    "papers": [
        {
            "id": 10,
            "title": "paper0",
            "fields_of_study": ["finance", "options", "economics"],
            "custom_keywords": ["pricing", "risk", "modeling"],          // <------ To be added by Hanfei
            "authors": [5476, 5476]
        },
        {
            "id": 11,
            "title": "paper1",
            "fields_of_study": ["finance", "economics"],
            "custom_keywords": ["pricing", "risk", "black scholes"],          
            "authors": [54768, 96708]
        }
    ],
    "authors": [
        {
            "id": 20,
            "name": "name1",
            "expertise": ["one", "two", "three"],
            "msa_papers": [10, 12]
        },
        {
            "id": 21,
            "name": "name2",
            "expertise": ["one", "oiok"],
            "msa_papers": [10, 11, 12]
        }
    ],
    "unified_keywords": [                                // <------ Either fields_of_study or custom_keywords
        "options", "pricing", "black sholes"
    ]
}

function generate_weights_datastructure(data) {
    weights = {
        "papers_ids": {},
        "unified_keywords": {},
        "author_ids": {},
        "expertise": {}
    };

    data.papers.forEach(paper => {
        if (weights.papers_ids.hasOwnProperty(paper.id)) {
            weights.papers_ids[paper.id] += 1
        } else {
            weights.papers_ids[paper.id] = 1
        }
        paper.fields_of_study.forEach(key => {
            if (weights.unified_keywords.hasOwnProperty(key)) {
                weights.unified_keywords[key] += 1
            } else {
                weights.unified_keywords[key] = 1
            }
        });
        paper.custom_keywords.forEach(key => {
            if (weights.unified_keywords.hasOwnProperty(key)) {
                weights.unified_keywords[key] += 1
            } else {
                weights.unified_keywords[key] = 1
            }
        });
        paper.authors.forEach(author => {
            if (weights.author_ids.hasOwnProperty(author)) {
                weights.author_ids[author] += 1
            } else {
                weights.author_ids[author] = 1
            }
        });
    });

    data.authors.forEach(author => {
        author.msa_papers.forEach(paper => {
            if (weights.papers_ids.hasOwnProperty(paper)) {
                weights.papers_ids[paper] += 1
            } else {
                weights.papers_ids[paper] = 1
            }
        });
        author.expertise.forEach(area => {
            if (weights.expertise.hasOwnProperty(area)) {
                weights.expertise[area] += 1
            } else {
                weights.expertise[area] = 1
            }
        });
    });

    data.unified_keywords.forEach(key => {
        if (weights.unified_keywords.hasOwnProperty(key)) {
            weights.unified_keywords[key] += 1;
        } else {
            weights.unified_keywords[key] = 1
        }
    });

    sorted_weights = {};

    Object.keys(weights).forEach(attribute => {
        sortable = [];
        Object.keys(weights[attribute]).forEach(id => {
            sortable.push([id, weights[attribute][id]]);
        })
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        sorted_weights[attribute] = sortable.slice(0, 5);
    });
    
    return sorted_weights
}

/*
"query": {
        "function_score": {
          "query": {"multi_match" : {
                "query": "finance stocks",
                "fields" : [ "abstract", "fields_of_study^2", "title^3" ]
        	} },
          "functions": [
              {
                  "filter": { "match": { "abstract": "finance" } },
                  "weight": 23
              },
              {
                  "filter": { "match": { "abstract": "stocks" } },
                  "weight": 80
              }
          ]
        }
        
        }
*/

function generate_elastic_query(original_keyword,sorted_weights) {
    custom_keywords = [];
    weights_abstract = [50,40,30,20,10];
    weights_title= [150,120,90,60,30];
    sorted_weights.unified_keywords.forEach(function(item, index) {
        //console.log(item, index);
        temp_abs = { 
            "filter": { "match": { "abstract": item[0] } },
            "weight": weights_abstract[index]
        };
        temp_title = { 
            "filter": { "match": { "title": item[0] } },
            "weight": weights_title[index]
        };
        custom_keywords.push(temp_abs);
        custom_keywords.push(temp_title);
      });
    
    //console.log(custom_keywords[0].match);
    query = {
        "query": {
        "function_score": {
            "query": {"multi_match" : {
                  "query": original_keyword,
                  "fields" : [ "abstract", "fields_of_study^2", "title^3" ]
              } },
              "functions": custom_keywords
          }
        }
    };
    
    return query
}

sorted_weights = generate_weights_datastructure(data);
//console.log(sorted_weights);
query = generate_elastic_query('finance', sorted_weights);
console.log(JSON.stringify(query));
