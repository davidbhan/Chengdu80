import React from "react";
import { Avatar, Icon, List } from "antd";
import { Paper } from "./Paper";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const SearchResults = ({ papers, loading, addItem }) => {
  return (
    <List
      loading={loading}
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 7
      }}
      dataSource={papers}
      renderItem={item => <Paper item={item} />}
    />
  );
};

export default SearchResults;
