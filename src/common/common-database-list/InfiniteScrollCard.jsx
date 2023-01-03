import TimeLineCard from "../../common/timeline-card";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AWS_URL } from '../../../env.json';
import CommonCard from "../../common/common-card";
import { useUserQuery } from "../../api/user";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 40,
    }}
    spin
  />
);

const InfiniteScrollCard = ({formData, userNameMutation}) => {
  const [page, setPage] = useState(1)
  const { data: userList, isLoading } = useUserQuery();
  const [data, setData] = useState([]);

  const fetchMoreData = () => {
    setPage(page + 1)
    const payload = {...formData, page: page + 1, limit: 100};
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    setTimeout(() => {
      userNameMutation(payload)
    }, 1500);
  };


  useEffect(() => {
    // fetchMoreData();
  }, []);



  useEffect(() => {
    const newData = userList?.users || []
    setData([...data, ...newData])
  }, [userList?.users])
  
  useEffect(() => {
      const payload = {...formData, page: 1, limit: 30};
      Object.keys(payload).forEach(key => {
        if(!payload[key])
          delete payload[key]
      });
      userNameMutation(payload);
      // setData([])
      setData(userList?.users || []);
      setPage(1);
  }, [
    formData?.category, formData?.subCategory, formData?.tags, formData?.city,
    formData?.state, formData?.country, formData?.fullName, formData?.skinTone,
    formData?.hairColor, formData?.eyeColor, formData?.available, formData?.extraTalent,
    formData?.bestIn, formData?.languages, formData?.gender, formData?.weightMinimum,
    formData?.weightMaximum, formData?.heightMinimum, formData?.heightMaximum, formData?.budgetMinimum,
    formData?.budgetMaximum, formData?.ageMinimum, formData?.ageMaximum, formData?.experienceMinimum,
    formData?.experienceMaximum
  ])


    return (
        <InfiniteScroll
          dataLength={data?.length}
          next={fetchMoreData}
          hasMore={true}
          refreshFunction={fetchMoreData}
          pullDownToRefresh
          loader={<div style={{textAlign: 'center', marginTop: '40px'}}><Spin /></div>}
          // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        >
        <List
          dataSource={data}
          renderItem={(item) => (
            <CommonCard
              user={item}
            />
          )}
          ></List>
        </InfiniteScroll>
    );
}

export default InfiniteScrollCard;
