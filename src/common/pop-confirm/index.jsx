import { Popconfirm } from 'antd';
import React from 'react';

const PopConfirm = ({title, body, onConfirm, onCancel}) => (
  <Popconfirm
    title={title}
    onConfirm={onConfirm}
    onCancel={onCancel}
    okText="Yes"
    cancelText="No"
  >
    {body}
  </Popconfirm>
);

export default PopConfirm;