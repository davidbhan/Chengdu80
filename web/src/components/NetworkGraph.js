import React from "react";
import { Graph } from "react-d3-graph";
import { uniqBy, flatten, maxBy, minBy } from "lodash";
import { connect } from "react-redux";
import * as selection from "../actions/selection";
import { Row } from "antd";

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
)(({ authorData, selectAuthor }) => {
  const getPapersFromAuthor = (author, degree) => {
    return uniqBy(
      [
        ...author.papers.map(paper => ({
          ...paper,
          authors: paper.authors.map(author => ({
            ...author,
            degree,
            papers: []
          }))
        })),
        ...flatten(
          author.papers.map(paper =>
            flatten(
              paper.authors.map(author =>
                author.papers ? getPapersFromAuthor(author, degree + 1) : []
              )
            )
          )
        )
      ],
      item => item.id
    );
  };
  const allPapers = getPapersFromAuthor(authorData, 0);
  const allAuthors = uniqBy(
    allPapers.reduce((previous, paper) => {
      return [...previous, ...paper.authors];
    }, []),
    item => item.id
  );
  const maxPrestige = maxBy(allAuthors, author => author.prestigeScore)
    .prestigeScore;
  const minPrestige = minBy(allAuthors, author => author.prestigeScore)
    .prestigeScore;
  const nodes = allAuthors.map(({ id, name, prestigeScore, degree }) => ({
    id,
    name,
    size:
      100 + (400 * (prestigeScore - minPrestige)) / (maxPrestige - minPrestige),
    color: DEGREE_COLORS[degree]
  }));
  const allLinks = allPapers.reduce((previousLinks, paper) => {
    const authorRelations = paper.authors.reduce(
      (combinations, { id, name }, authorIndex) => {
        const currentCombinations = combinations;
        if (authorIndex < paper.authors.length - 1) {
          for (const otherAuthor of paper.authors.slice(
            authorIndex + 1,
            paper.authors.length
          )) {
            const [source, target] = [id, otherAuthor.id].sort();
            currentCombinations.push({ source, target });
          }
        }
        return currentCombinations;
      },
      []
    );
    return [...previousLinks, ...authorRelations];
  }, []);
  const collaborationFrequency = {};
  for (const item of allLinks) {
    const key = `${item.source};${item.target}`;
    if (!(key in collaborationFrequency)) {
      collaborationFrequency[key] = 0;
    }
    collaborationFrequency[key] += 1;
  }
  const links = uniqBy(allLinks, item => `${item.source};${item.target}`).map(
    ({ source, target }) => ({
      source,
      target,
      strokeWidth: collaborationFrequency[`${source};${target}`]
    })
  );
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
          links,
          focusedNodeId: authorData.id
        }}
        onClickNode={author_id => selectAuthor(author_id)}
        config={myConfig}
      />
    </Row>
  );
});
