import React from "react";
import { Icon, List } from "antd";

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
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText type="plus-circle" text={"Add results like these"} />
          ]}
        >
          <List.Item.Meta title={<a href={item.href}>{item.name}</a>} />
        </List.Item>
      )}
    />
  );
};

export default SearchResults;
