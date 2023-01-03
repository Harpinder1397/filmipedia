import React, { useState, useEffect, useContext } from "react";
import { Row, Spin } from "antd";
import 'react-calendar/dist/Calendar.css';
import './style.less'
import { mapStates, mapCities } from '../common/utils';
import { FiltersContext } from "../App";
import { useAddToFavouritesApiQuery, useGetMyFavouritesQuery, useMyFavouritesQuery, useRemoveFromFavouritesApiQuery } from "../api/favourites";
import CommonCard from "./common-card";
import EmptyMessage from "./emptyMessage/EmptyMessage";
import { useHistory } from "react-router";
import CommonPagination from "./pagination/CommonPagination";

export default function CommonList({ users, isFav, isLoading }) {
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('token');
	const [location, setLocation] = useState(undefined);
	const [selectedState, setSelectedState] = useState(null);
	const [cities, setCities] = useState([]);
  const history = useHistory();
  const { states } = useContext(FiltersContext);
  
  const {data, isLoading : loading1 } = useMyFavouritesQuery();
  const {mutate: myFavouritesApi, isLoading : loading2 } = useGetMyFavouritesQuery();
  const {mutate: addToFavouritesApi, isLoading: loading3} = useAddToFavouritesApiQuery();
  const {mutate: removeFromFavouritesApi, isLoading: loading4} = useRemoveFromFavouritesApiQuery();

  const mainLoader = isLoading || loading2 || loading3 || loading4

  const getFavList = async () => {
      myFavouritesApi(userId);
  }

  const handleFavourite = async (userInfo) => {
    if(!token) return history.push('/signin')
    const payload = {
        userId: userId,
        favUserId: userInfo._id,
        favName: userInfo?.fullName || '',
        experience: userInfo?.experience || '',
        favSubCategory: userInfo?.subCategory || '',
        favThumbnail: userInfo.thumbnails.find((thumbnail) => thumbnail.dp)?.url || ''
    }
    addToFavouritesApi(payload);
}

  const handleRemoveFavourite = async (id) => {
    if(!token) return history.push('/signin')
    const payload = {
      userId: userId,
      favUserId: id
    }
    removeFromFavouritesApi(payload);
  }

  useEffect(() => {
    getFavList()
  }, []);

  // useEffect(() => {
	// 	const data = mapStates(states)
	// 	setLocation(data);
	// },[states])

	// useEffect(() => {
	// 	if(selectedState) {
	// 		const cities = mapCities(states, selectedState)
	// 		setCities(cities);
	// 	}
	// },[selectedState])
  
  return (
    <Spin spinning={mainLoader}>
      <div className="list-container">
        <Row>
          <div className="second-list-container">
            {
              users?.length ? users?.map((user) => 
                 <CommonCard
                  user={user}
                  favList={data}
                  handleFavourite={handleFavourite}
                  handleRemoveFavourite={handleRemoveFavourite}
                  isFav={isFav}
                />
              ) : <EmptyMessage />
            }
          </div>
        </Row>
      </div>
    </Spin>
  )
}
