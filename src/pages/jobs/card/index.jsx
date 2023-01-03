import React from "react";
import {
  CloseOutlined,
  EditOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PopConfirm from "../../../common/pop-confirm";
import defaultThumbnail from '../../../assets/images/avatar.png'

// styles
import "./cardStyle.less";
import { Popover } from "antd";
import { useGetUserDataQuery, useGetUserQuery } from "../../../api/user";

const JobCard = ({ userId, data, allJobApplicationsList, handleShareDetails, handleUpdate, handleDelete }) => {

  const { data: userInfo } = useGetUserDataQuery();
  const {mutate: getUserQuery} = useGetUserQuery()

  const handleNameMouseHover = (item) => {
    if(item.postedById){
      getUserQuery(item?.postedById)
    }
  }

  const renderApplyButton = (item) => {
   const alreadyApplyApplication = allJobApplicationsList?.find((job)=> job?.jobId == item?._id && job?.sharedById == userId)
   if(alreadyApplyApplication){
    return (
      <button
        className="already-applied-btn"
        // onClick={() => handleShareDetails(item)}
      >
        Already Applied
      </button> 
    )
   } else {
    return (
      <button
        className="apply-btn"
        onClick={() => handleShareDetails(item)}
      >
        Apply
      </button> 
    )
   }
  }

const content = () => {
  return (
  <div className="ant-popover-inner-content-section card-container">
  <div className="img-wrapper">
    <img src={defaultThumbnail} alt="dp" />
  </div>
  <div className='d-flex flex-col details'>
    <div>
      <div className="cursor-pointer" style={{fontSize: '16px'}}>
          {userInfo?.fullName}
      </div>
      <div className="sub-cat" style={{fontSize: '15px'}}>
         {userInfo?.category}
      </div>
      <div className="meta" style={{fontSize: '14px'}}>
        {userInfo?.city}
      </div>
      <div className="meta" style={{fontSize: '13px'}}>
        {userInfo?.experience} Years
      </div>
    </div>
    
  </div>
 
</div>
);
}

  return (
    <>
      <div className="new-card-display">
        {/* new card start.. */}
        {data?.map((item) => {
          return (
            <div className="new-card-container">
              <div className="card-content-container">
                <div>
                  <h1>
                    {item.jobTitle}
                    {userId == item?.postedById ? (
                      <>
                      <EditOutlined
                      onClick={() => handleUpdate(item)}
                      style={{ cursor: "pointer", fontSize: "19px" }}
                    />
                    <PopConfirm
                      title="Are you sure?"
                      onConfirm={() => {
                        handleDelete(item._id);
                      }}
                      body={
                        <CloseOutlined
                          style={{ cursor: "pointer", fontSize: "19px" }}
                        />
                      }
                    />
                    </>
                    ): null}
                    
                  </h1>
                  <b>
                    <UserOutlined /> shared by : <Popover className="top" placement="bottom" content={content(item)} ><i className="hover-user-name" onMouseOver={()=>handleNameMouseHover(item)}>{item.postedByName}</i></Popover>
                  </b>
                  <p style={{ marginTop: "7px" }}>
                    <UsergroupAddOutlined style={{ marginRight: "5px" }} />
                    {item.postedByCategory}
                  </p>
                  <p>
                    {" "}
                    <img
                      src="https://www.svgrepo.com/show/127575/location-sign.svg"
                      width={"12px"}
                      style={{ marginRight: "5px" }}
                    />
                    {item.city}{item.state && `, ${item.state}`} {item.country && `(${item.country})`}
                  </p>

                  <p style={{ margin: "11px 0 16px" }}>
                    <img
                      src="https://cdn.iconscout.com/icon/premium/png-256-thumb/writing-2779694-2324192.png"
                      width={"19px"}
                      style={{ marginRight: "4px" }}
                    />
                    {item.content}
                  </p>
                </div>
                <div className="card-bottom-content">
                  <span>
                    Poste:{" "}
                    <b> {new Date(item?.postedOn).getUTCDate()} days ago</b>
                  </span>
                  <span>
                    Openings: <b> {item.requirement}</b>
                  </span>
                  {/*<span>
                    Job Applicants: <b>{JobApplicationsLength}</b>
                    </span>*/}
                    <span>
                    Left: <b> {new Date(item?.postedTill).getUTCDate()} days</b>
                  </span>
                </div>
              </div>
              <div className="image-container">
                <div className="image-box">
                  <img src="https://t3.ftcdn.net/jpg/04/93/13/42/360_F_493134256_DsdRygnyk1VflTXXuAjI211fWJqDLu1W.jpg" />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {userId == item?.postedById ? null : (
                    renderApplyButton(item)
                  )}
                  {/*<span>
                    left: <b> {new Date(item?.postedTill).getUTCDate()}</b>
                </span>*/}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default JobCard;
