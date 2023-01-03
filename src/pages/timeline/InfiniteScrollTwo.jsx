import TimeLineCard from "../../common/timeline-card";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AWS_URL } from '../../../env.json';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 40,
    }}
    spin
  />
);

const InfiniteScrollTwo = () => {
  const [data, setData] = useState([])
  // const [dataLength, setDataLength] = useState(0)

  const fetchMoreData = () => {
    fetch(`${AWS_URL}/user`)
      .then((res) => res.json())
      .then((body) => {
        setTimeout(() => {
        setData([...data, ...body?.users]);
        // setDataLength(body.length)
        }, 1500);
      })
      .catch(() => {
        // setLoading(false);
      });
    
  };

  useEffect(() => {
    fetchMoreData();
  }, []);


    return (
        <InfiniteScroll
          dataLength={data?.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<div style={{textAlign: 'center', marginTop: '40px'}}><Spin indicator={antIcon} /></div>}
          // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
        <List
          dataSource={data}
          renderItem={(item) => (
            <TimeLineCard user={item} />
          )}
          ></List>
        </InfiniteScroll>
    );
}

export default InfiniteScrollTwo;
