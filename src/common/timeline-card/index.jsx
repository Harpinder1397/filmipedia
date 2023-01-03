import React from "react";
import moment from 'moment';
// import defaultThumbnail from 'assets/images/avatar.png';
import './timeline.less';
import { VerifiedOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const TimeLineCard = ({user}) => {
  const history = useHistory();
  return (
    <div className="timeline-container">
      {/*<div className="dp-con">
        <img src={user.dp} width="100%" style={{ borderRadius: '50%'}} />
  </div>*/}
      <div className="info-con" onClick={() => history.push(`/profile/${user?.id}`)}>
        <div className="name-date">
          <div className="section-profile">  
            <div className="dp-con">
              <img src={user?.dp} width="100%" style={{ borderRadius: '50%'}} />
            </div>{user?.name} <VerifiedOutlined />
          </div>
          <div>
            {moment(user?.createdAt).format('DD-MM-YYYY')}
          </div>
        </div>
        <div className="img-con">
          <img src={user?.url || 'https://t3.ftcdn.net/jpg/04/93/13/42/360_F_493134256_DsdRygnyk1VflTXXuAjI211fWJqDLu1W.jpg'} style={{width: '235px', height: '235px'}} alt="post" />
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default TimeLineCard;