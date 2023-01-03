import { apiPost, apiGet, apiDelete } from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const useMyFavouritesQuery = () => {
  return useQuery(["MyFavourites"], [`${API_URL}/favourites`], () =>
    apiGet(`${API_URL}/favourites`)
  );
};

export const useGetMyFavouritesQuery = () => {
  const queryClient = useQueryClient();
  return useMutation([`${API_URL}/favourites`],(userId) =>
    apiGet(`${API_URL}/favourites/${userId}`),
   {
      onSuccess: (newUser) => {
        queryClient.setQueryData(["MyFavourites"], newUser);
      },
      onError: (error, payload, { prevUserData }) => {
        queryClient.setQueryData(["MyFavourites"], prevUserData);
      },
    }
  );
};

export const useAddToFavouritesApiQuery = () => {
  // const queryClient = useQueryClient();
  const url = `${API_URL}/favourites`
  const userId = localStorage.getItem('user');

  const { mutate: myFavourites } = useGetMyFavouritesQuery();
  return useMutation([`${API_URL}/favourites`],(payload) =>
    apiPost(url, payload),
   {
      onSuccess: (newUser) => {
        //  console.log(newUser, 'newUser')
        myFavourites(userId);
        // queryClient.setQueryData(["MyFavourites"], newUser);
      },
      // onError: (error, payload, { prevUserData }) => {
      //   queryClient.setQueryData(["MyFavourites"], prevUserData);
      // },
    }
  );
};

export const useRemoveFromFavouritesApiQuery = () => {
  const userId = localStorage.getItem('user');
  
  const { mutate: myFavourites } = useGetMyFavouritesQuery();
  return useMutation([`${API_URL}/favourites`],(payload) =>
    apiDelete(`${API_URL}/favourites/${payload?.userId}/${payload?.favUserId}`),
   {
      onSuccess: (newUser) => {
        //  console.log(newUser, 'newUser')
        myFavourites(userId);
        // queryClient.setQueryData(["MyFavourites"], newUser);
      },
      // onError: (error, payload, { prevUserData }) => {
      //   queryClient.setQueryData(["MyFavourites"], prevUserData);
      // },
    }
  );
};