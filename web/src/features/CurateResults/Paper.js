import React from "react";
import { Icon, List } from "antd";
import { connect } from "react-redux";
import { paut } from "../../actions";

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
    }
  };
};

export const Paper = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ item, color, likePaper, papers }) => {
  return (
    <List.Item
      key={item.name}
      actions={[
        <IconText
          onClick={() => likePaper(item)}
          type="plus-circle"
          text={"Add results like these"}
        />
      ]}
    >
      <List.Item.Meta title={<a href={item.href}>{item.name}</a>} />
    </List.Item>
  );
});
