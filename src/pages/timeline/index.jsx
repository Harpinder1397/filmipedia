import React, { useEffect, useState } from "react";
import { getUserApi, useUpdateUserNameMutation, useUserQuery } from "../../api/user";
import TimeLineCard from "../../common/timeline-card";
import EmptyMessage from "../../common/emptyMessage/EmptyMessage";

import "./timelineStyle.less";
import { Spin } from "antd";
import InfiniteScrollList from "./InfiniteScrollList";
import ListCard from "./ListCard";
import InfiniteScrollTwo from "./InfiniteScrollTwo";

const TimeLine = () => {
  const [userDetails, setUserDetails] = useState({});
  const userId = localStorage.getItem('user');
  const { data: userList } = useUserQuery();
  const {mutate: fetchserNameMutation, isLoading} = useUpdateUserNameMutation()

  const getUserDetails = async () => {
    await getUserApi(userId).then((data) => {
      setUserDetails(data);
    });
	}

  useEffect(() => {
    getUserDetails();
  }, [])

  useEffect(() => {
    fetchserNameMutation();
  }, [])


  const timeLineArray = userList?.users
    ?.filter((user) => user.thumbnails.length)
    .map((item) =>
      item.thumbnails.map((dt) => {
        return {
          ...dt,
          name: item.fullName,
          id: item._id,
          dp: item.thumbnails.find((img) => img.dp)?.url,
        };
      })
    )
    .flat()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // setAllUsers(timeLineArray);
  // }

  return (
    <Spin spinning={false}>
    <div className="timeline-main-container">
      <div className="main-left-section">
        <div className="info-left-container">
        <div className="image-box">
          <img src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png" />
        </div>
        <span style={{ textAlign: "center", lineHeight: "10px" }}>
          <h1>{userDetails?.fullName}</h1>
          <p>{userDetails?.category}</p>
        </span>
    </div>
      </div>

      
      
      <div className="center-card-container">
      {/*timeLineArray?.length ? (
        timeLineArray?.map((user) => (
          <TimeLineCard user={user} />
        ))) : <EmptyMessage />*/}
      {/*<InfiniteScrollList  timeLineArray={timeLineArray}/>*/}
      <InfiniteScrollTwo timeLineArray={timeLineArray} />
      
      </div>
      <div className="right-container">
        <div>
          <ListCard userList={timeLineArray}/>
        </div>
      </div>
    </div>
    </Spin>

  );
};

export default TimeLine;
