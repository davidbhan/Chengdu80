import React from "react";
import { Icon, List, Typography } from "antd";
import { connect } from "react-redux";
import { papers, paut, selection } from "../../actions";
import moment from "moment";

export const PAPERS_QUERY = `
  papers {
    id
    title
    abstract
    authors {
      id
      name
      image
      institution {
        id
        name
      }
    }
    topics {
      name
    }
    keywords
    publishedDate
  }
`;
export const IconText = ({ type, text, onClick }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} onClick={onClick} />
    {text}
  </span>
);

const mapStateToProps = state => {
  return {
    papersSelected: state.paut.papers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePaper: paper => {
      dispatch(paut.addPaperToLike(paper));
    },
    previewPaper: paper => {
      dispatch(selection.renderPaper(paper));
    },
    redoSearch: () => {
      dispatch(papers.getSearchPapers());
    }
  };
};

export const Paper = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ item, likePaper, previewPaper, redoSearch, papersSelected }) => {
  return (
    <List.Item
      key={item.title}
      onClick={() => {
        previewPaper(item);
      }}
      actions={[
        <Icon
          onClick={() => {
            likePaper(item);
            redoSearch();
          }}
          type="like"
          theme={
            papersSelected
              .map(paperSelected => paperSelected.id)
              .includes(item.id)
              ? "filled"
              : "outlined"
          }
        />,
        <IconText
          type="user"
          text={item.authors.map((val, index) => (
            <Typography.Text key={val.name}>
              {val.name.split(" ")[val.name.split(" ").length - 1]}
              {index < item.authors.length - 1 && (
                <span style={{ color: "#e8e8e8" }}> - </span>
              )}
            </Typography.Text>
          ))}
        />,
        <IconText
          type="calendar"
          text={moment(item.publishedDate).format("MMM YY")}
        />
      ]}
    >
      <List.Item.Meta description={<a href={item.href}>{item.title}</a>} />
    </List.Item>
  );
});
