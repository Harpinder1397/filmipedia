import React from 'react'
import { HeartFilled, HeartOutlined, VerifiedOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router';
import defaultThumbnail from '../../assets/images/avatar.png'
import { Checks } from 'tabler-icons-react';
import './commonCard.less';
import qs from "query-string";
import { Tooltip } from 'antd';

const CommonCard = ({key, user, favList, isFav, handleFavourite, handleRemoveFavourite}) => {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');


  // const handleFavourite = async (userInfo) => {
  //     if(!token) return history.push('/signin')
  //     const payload = {
  //         userId: userId,
  //         favUserId: userInfo._id,
  //         favName: userInfo?.fullName || '',
  //         favSubCategory: userInfo?.subCategory || '',
  //         favThumbnail: userInfo.thumbnails?.find((thumbnail) => thumbnail.dp)?.url || ''
  //     }
  //     addToFavouritesApi(payload);
  // }

  // const handleRemoveFavourite = async (id) => {
  //   if(!token) return history.push('/signin')
  //   removeFromFavouritesApi(userId, id);
  // }

  const handleNavigationUser = (user) => {
    // history.push(`/profile/${user?.favUserId || user?._id}`)

    if(userId && token) {
      history.push(`/profile/${user?.favUserId || user?._id}`)
    } else {
      history.push(`/signin/?callbackUrl=profile/${user?._id}`)
    } 
  }

const renderToptipTitle = (verify) => {
  if(verify){
    return "Verified"
  }else {
    return "Not Verified"
  }
}

const renderIconCheckColor = (verify) => {
  if(verify){
    return "green"
  }else {
    return "#D3D3D3"
  }
}

  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

  const history = useHistory();
  return (
    <div  key={key} className="card-container">
      <div className="img-wrapper">
        <img src={isFav ? (user?.favThumbnail || defaultThumbnail) : (user?.thumbnails?.find((thumbnail) => thumbnail.dp)?.url || defaultThumbnail)} alt="dp" />
      </div>
      <div className='d-flex flex-col details'>
        <div>
        <div className="name-section">
          <div className="cursor-pointer" onClick={() => handleNavigationUser(user)}>
              {user?.fullName || user?.favName}
          </div>
          <Tooltip className="icon" placement="bottom" title={renderToptipTitle(user?.verified)}>
            <Checks size={16} color={renderIconCheckColor(user?.verified)} />
          </Tooltip>
         
          </div>
          <div className="sub-cat">
              {user?.subCategory || user?.favSubCategory}
          </div>
          <div className="meta">
            {/* user?.experience ? `${user?.experience} years` : '' */}
            {user?.city && `${user?.city}, `}{user?.state && `${user?.state}`}{user?.country && `, ${user?.country}`}
          </div>
          <div className="meta available-meta">
            {user?.available}
          </div>
        </div>
        
        <div className="action-btns">
          <div />
          {token ?
            isFav || favList?.find((fav) => user?._id === fav.favUserId)
            ? <HeartFilled style={{ color: 'red'}} onClick={() => handleRemoveFavourite(user?.favUserId || user?._id)}/>
            : <HeartOutlined onClick={() => handleFavourite(user)}/> : null
          }
        {/* </div> */}
        </div>
      </div>
     
    </div>
  )
}

export default CommonCard;