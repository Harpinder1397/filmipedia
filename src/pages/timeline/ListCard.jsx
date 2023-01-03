import React from 'react';
import { Avatar, List } from 'antd';

const ListCard = ({userList}) => (
  <List
    itemLayout="horizontal"
    dataSource={userList?.users}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="https://ant.design">{item?.fullName}</a>}
          description="vel illum qui dolorem eum fugiat quo voluptas nulla pariatur."
        />
      </List.Item>
    )}
  />
);
export default ListCard;