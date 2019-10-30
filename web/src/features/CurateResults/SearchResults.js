import React from "react";
import { List } from "antd";
import { Paper } from "./Paper";

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
