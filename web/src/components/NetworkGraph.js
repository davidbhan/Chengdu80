import React, { useLayoutEffect, useRef, useState } from "react";
import { Graph } from "react-d3-graph";
import { uniqBy, flatten } from "lodash";
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
  height: 300,
  width: 350
};

export const NetworkGraph = ({ authorData }) => {
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
  const allPapers = getPapersFromAuthor(authorData, 1);
  const nodes = uniqBy(
    allPapers.reduce((previous, paper) => {
      return [...previous, ...paper.authors];
    }, []),
    item => item.id
  ).map(({ id, name, degree }) => ({ id, name, opacity: 1 / degree }));
  const links = uniqBy(
    allPapers.reduce((previousLinks, paper) => {
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
    }, []),
    item => `${item.source}${item.target}`
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
          links
        }}
        config={myConfig}
      />
    </Row>
  );
};
