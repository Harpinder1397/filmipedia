import React from 'react';
import { Pagination } from 'antd';

// const onShowSizeChange = (current, pageSize) => {
//   console.log(current, pageSize, 'gfggfg');
// };

const CommonPagination = ({onShowSizeChange, total, current, tablePagination, pageSize}) => {
    return (
      <> {tablePagination ? 
    <Pagination
      showSizeChanger={false}
      onChange={onShowSizeChange}
      // onShowSizeChange={onShowSizeChange}
      // current={current}
      defaultCurrent={1}
    // pageSizeOptions={20}
      pageSize={pageSize || 10}
      total={total}
    /> : <Pagination
    showSizeChanger={false}
    onChange={onShowSizeChange}
    // onShowSizeChange={onShowSizeChange}
    current={current}
    // defaultCurrent={current}
  // pageSizeOptions={20}
    pageSize={pageSize || 10}
    total={total}
  /> 
    } </>
    )
    };
export default CommonPagination;