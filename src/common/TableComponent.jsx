import React from 'react';
import {
  Table, Button, Input, Pagination,
} from 'antd';
import './style.less';
import {
  PlusCircleFilled,
} from '@ant-design/icons';

const { Search } = Input;

export default function TableComponent(props) {
  const {
    title,
    columns,
    data,
    paginationProp,
    toAdd,
    isListReadOnly,
    toShowSearchBar,
    className,
    onChange
  } = props;

  return (
    <div className={`table-component-div ${className}`}>
      <div className="accounts-tabs">
        <span className="text account-label">{title}</span>
        <div className="top-button-header">
          {toAdd
            ? (
              <Button
                type="primary"
                icon={<PlusCircleFilled />}
                onClick={() => props.addAccount()}
                disabled={isListReadOnly}
              >
                {toAdd}
              </Button>
            )
            : null}

          {
            // eslint-disable-next-line react/destructuring-assignment
            props?.setIsListReadOnly && !toShowSearchBar
              ? (
                <Button type="primary" onClick={() => props.setIsListReadOnly(!isListReadOnly)}>
                  {isListReadOnly ? 'Edit' : 'Cancel'}
                </Button>
              )
              // eslint-disable-next-line react/destructuring-assignment
              : (props.setSearchQuery && (
                <Search
                  placeholder="input search text"
                  className="searchInput"
                  onSearch={(value) => props.setSearchQuery(value)}
                  allowClear
                />
              ))
          }
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        onChange={onChange}
        pagination={paginationProp}
      />
      
    </div>
  );
}
