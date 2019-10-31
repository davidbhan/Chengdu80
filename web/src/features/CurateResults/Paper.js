import React from "react";
import { Icon, List, Typography } from "antd";
import { connect } from "react-redux";
import { paut, selection } from "../../actions";
import moment from "moment";

const IconText = ({ type, text, onClick }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} onClick={onClick} />
    {text}
  </span>
);

const mapStateToProps = state => {
  return {
    papers: state.paut.papers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePaper: paper => {
      dispatch(paut.addPaperToLike(paper));
    },
    previewPaper: paper => {
      dispatch(selection.renderPaper(paper));
    }
  };
};

export const Paper = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ item, likePaper, previewPaper }) => {
  return (
    <List.Item
      key={item.title}
      onClick={() => {
        previewPaper(item);
      }}
      actions={[
        <Icon onClick={() => likePaper(item)} type="like" />,
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
