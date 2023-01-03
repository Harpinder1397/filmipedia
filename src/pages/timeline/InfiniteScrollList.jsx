import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import TimeLineCard from '../../common/timeline-card';
const InfiniteScrollList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    fetch('http://localhost:3000/user')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.users]);
        setTimeout(() => {
        setLoading(false);
          
        }, 2000);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div style={{
      width: '100%'
    }}>
    <Spin spinning={loading} style={{width: '100%'}}>
    <div
      id="scrollableDiv"
      style={{
        height:'100vh',
        // height: 'auto',
        width: '100%',
        overflow: 'auto',
        // padding: '0 16px',
        // border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length > 1}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <TimeLineCard user={item} />
          )}
        />
      </InfiniteScroll>
    </div>
    </Spin>
    </div>
  );
};
export default InfiniteScrollList;