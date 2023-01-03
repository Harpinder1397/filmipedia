import React, { useState, useEffect } from "react";
import { getAllUsersApi } from "../../api/user";
import { useParams } from "react-router-dom";
import CommonList from "../../common/CommonList";


export default function DirectorList() {
    let {id} = useParams();
    const [profileData, setProfileData] = useState([]);
    const [isUnAuth,  setIsUnAuth] = useState(false);
    const category = 'director';
  
    useEffect(() => {
      getDetails();
    }, [category, id])

    const getDetails = async() => {
      const payload = {
        category: category,
        subCategory: id
      }
      // console.log()
      let obj = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v != null));
      // payload[field] = query;
      const data = await getAllUsersApi(obj);
      if(data.response && data.response.status == 401){
        return setIsUnAuth(true)
      }
      setProfileData(data.users);
    }

    return (
      <>
        <CommonList 
          profileData={profileData}
          category={category}
          // isUnAuth={isUnAuth}
          // onClickCancel={()=>setIsUnAuth(false)}
        />
      </>
    )
  }