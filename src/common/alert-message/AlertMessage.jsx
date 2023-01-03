import { message } from 'antd';
import React from 'react';

const AlertMessage = ({type, content}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const handleClick = () => {
        messageApi.open({
          type: 'warning',
          content: 'This is a warning message',
        });
      };
    

  return (
    <div>{contextHolder}</div>
  )
}

export default AlertMessage