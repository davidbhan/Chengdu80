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
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      }}
      dataSource={papers}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText type="plus-circle" text={"Add results like these"} />,
            <IconText type="user-add" text={"Add authors like these"} />
          ]}
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.name}</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default SearchResults;
