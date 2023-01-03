/* eslint-disable*/

import React from 'react';
import { Select, Form } from 'antd';
import './sizeSelectorstyle.less';

const { Option } = Select;
const size = [5, 10, 15, 20, 25, 30];

const SizeSelector = (props) => (
  <Form.Item
    label="Select number of rows"
    className="size-selector"
  >
    <Select
      showSearch
      style={{
        width: '70px',
      }}
      onSelect={(value) => props.setSize(value)}
      defaultValue={10}
    >
      {
        size.map((val, key) => {
          return ( <Option
            className="sizeOptions"
            value={val}
            key={key}
          >
              {val}
          </Option> )
        })}
    </Select>
  </Form.Item>
);

export default SizeSelector;
