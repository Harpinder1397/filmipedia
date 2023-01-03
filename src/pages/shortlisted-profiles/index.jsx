import { useGetMyFavouritesQuery, useMyFavouritesQuery } from '../../api/favourites';
import CommonDataBaseList from '../../common/common-database-list';
import React, { useEffect } from 'react';

const ShortListedProfiles = ({ users }) => {
    const userId = localStorage.getItem('user');

    const { data, isLoading: loading1 } = useMyFavouritesQuery();
    const {mutate: myFavouritesApi, isLoading: loading2} = useGetMyFavouritesQuery();

    const mainLoader = loading1 || loading2;

    useEffect(() => {
      myFavouritesApi(userId);
    }, []);

    return (
        <CommonDataBaseList allUsers={data} loading={mainLoader} isFav/>
    )
}

export default ShortListedProfiles;