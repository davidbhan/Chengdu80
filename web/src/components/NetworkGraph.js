import React from "react";
import "lodash.combinations";
import { combinations, uniq, difference } from "lodash";
import { Graph } from "react-d3-graph";
import {
  uniqBy,
  flatten,
  maxBy,
  minBy,
  map,
  max,
  min,
  intersection
} from "lodash";
import { connect } from "react-redux";
import * as selection from "../actions/selection";
import { Row } from "antd";
import DirectedGraphMap from "directed-graph-map";

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    highlightStrokeColor: "blue",
    labelProperty: "name"
  },
  link: {
    highlightColor: "lightblue"
  },
  height: 400,
  width: 900
};

const DEGREE_COLORS = ["#0392ea", "#1dcdff"];

const mapDispatchToProps = dispatch => {
  return {
    selectAuthor: author_id => {
      dispatch(selection.renderAuthor(author_id));
      dispatch(selection.renderAuthorNetwork(author_id));
    }
  };
};

export const NetworkGraph = connect(
  () => ({}),
  mapDispatchToProps
)(({ authorData, selectAuthor, beta = false }) => {
  const getPapersFromAuthor = author => {
    return uniqBy(
      [
        ...author.papers.map(paper => ({
          ...paper,
          authors: paper.authors.map(author => ({
            ...author,
            papers: []
          }))
        })),
        ...flatten(
          author.papers.map(paper =>
            flatten(
              paper.authors.map(author =>
                author.papers ? getPapersFromAuthor(author) : []
              )
            )
          )
        )
      ],
      item => item.id
    );
  };
  const allPapers = getPapersFromAuthor(authorData);
  const allAuthors = uniqBy(
    allPapers.reduce((previous, paper) => {
      return [...previous, ...paper.authors];
    }, []),
    item => item.id
  );
  const dg = new DirectedGraphMap();
  const collaborationFrequency = {};
  for (const paper of allPapers) {
    for (const pair of combinations(
      paper.authors.map(author => author.id),
      2
    )) {
      const [source, target] = pair.sort();
      const key = `${source};${target}`;
      if (!(key in collaborationFrequency)) {
        collaborationFrequency[key] = 1;
      }
      if (dg.hasEdge(pair[0], pair[1])) {
        collaborationFrequency[key] += 1;
        continue;
      }
      dg.addEdge(pair[0], pair[1]);
    }
  }
  const collaborationFrequencies = Object.values(collaborationFrequency);
  const maxCollaboration = max(collaborationFrequencies);
  const minCollaboration = min(collaborationFrequencies);
  const links = dg.edges.map(edge => {
    const [source, target] = edge.sort();
    return {
      source,
      target,
      value: collaborationFrequency[`${source};${target}`],
      strokeWidth:
        1 +
        (4 *
          (collaborationFrequency[`${source};${target}`] - minCollaboration)) /
          (maxCollaboration - minCollaboration)
    };
  });
  const x = {};
  x["id"] = authorData.id;
  x["neighbors"] = {};
  const getNeighbours = author_id => {
    const neighbours = {};
    for (const link of links) {
      const { source, target, value } = link;
      if (source === author_id || target === author_id) {
        if (source === author_id) {
          neighbours[target] = value;
        } else {
          neighbours[source] = value;
        }
      }
    }
    return neighbours;
  };
  x["neighbors"] = getNeighbours(authorData.id);
  const sec = [];
  for (const author_id in x["neighbors"]) {
    const newData = {};
    newData["id"] = author_id;
    newData["neighbors"] = getNeighbours(author_id);
    sec.push(newData);
  }

  const weighted_neighborhood = dic => {
    let result = [];
    for (const neighbor in dic) {
      for (var i = 0; i < dic[neighbor]; i++) {
        result.push(neighbor);
      }
    }
    return result;
  };

  const sigma = (x, i) => {
    const gamma_x = weighted_neighborhood(x["neighbors"]);
    const gamma_i = weighted_neighborhood(i["neighbors"]);
    const intersect = intersection(gamma_x, gamma_i);
    return intersect.length / Math.sqrt(gamma_x.length * gamma_i.length);
  };

  const get_group = (x, sec, epsilon) => {
    const x_group = [];
    for (const neighbor in x["neighbors"]) {
      const y = [];
      for (var i = 0; i < sec.length; i++) {
        if (sec[i]["id"] === neighbor) {
          y.push(sec[i]);
        }
      }
      const sig = sigma(x, y[0]);
      if (sig > epsilon) {
        x_group.push(neighbor);
      }
    }
    return x_group;
  };

  if (beta) {
    const keep = get_group(x, sec, 0.1);
    if (keep.length > 1) {
      for (const remove_id of difference(
        [...dg.sources, ...dg.targets],
        keep
      )) {
        if (dg.hasTarget(remove_id)) {
          dg.removeTarget(remove_id);
        }
        if (dg.hasSource(remove_id)) {
          dg.removeSource(remove_id);
        }
      }
    }
  }

  const needed = uniq([...dg.sources, ...dg.targets]);

  const refined_links = dg.edges.map(edge => {
    const [source, target] = edge.sort();
    return {
      source,
      target,
      value: collaborationFrequency[`${source};${target}`],
      strokeWidth:
        1 +
        (4 *
          (collaborationFrequency[`${source};${target}`] - minCollaboration)) /
          (maxCollaboration - minCollaboration)
    };
  });

  const maxPrestige = maxBy(allAuthors, author => author.prestigeScore)
    .prestigeScore;
  const minPrestige = minBy(allAuthors, author => author.prestigeScore)
    .prestigeScore;
  const nodes = allAuthors
    .filter(({ id }) => needed.includes(id))
    .map(({ id, name, prestigeScore }) => ({
      id,
      name,
      size:
        100 +
        (400 * (prestigeScore - minPrestige)) / (maxPrestige - minPrestige),
      color:
        DEGREE_COLORS[
          dg.hasEdge(authorData.id, id) || dg.hasEdge(id, authorData.id) ? 0 : 1
        ]
    }));

  return (
    <Row type={"flex"} justify={"center"} align={"middle"}>
      <Graph
        id="author-network"
        data={{
          nodes: [
            ...nodes,
            {
              ...nodes.find(item => item.id === authorData.id),
              color: "red"
            }
          ],
          links: refined_links,
          focusedNodeId: authorData.id
        }}
        onClickNode={author_id => selectAuthor(author_id)}
        config={myConfig}
      />
    </Row>
  );
});
