import React from "react";
import { Icon, List, Typography } from "antd";
import { connect } from "react-redux";
import { paut, selection } from "../../actions";
import moment from "moment";
import { map } from "lodash";
import styled from "styled-components";

const IconText = ({ type, text, onClick }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} onClick={onClick} />
    {text}
  </span>
);

const PaddedText = styled(Typography.Text)`
  margin-left: 10px;
`;

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
          text={map(item.authors, val => (
            <PaddedText>
              {val.name.split(" ")[val.name.split(" ").length - 1]}
            </PaddedText>
          ))}
        />,
        <IconText
          type="calendar"
          text={moment(item.publishedDate).format("ll")}
        />
      ]}
    >
      <List.Item.Meta description={<a href={item.href}>{item.title}</a>} />
    </List.Item>
  );
});
