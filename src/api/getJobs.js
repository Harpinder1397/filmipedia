import { useMutation, useQuery, useQueryClient } from "react-query";
import qs from "query-string";
import { apiGet, apiPost } from "../utils/api";

const API_URL = 'http://localhost:3000'

export const useJobsQuery = () => {
    return useQuery(["jobs"],[`${API_URL}/jobs`], () =>
    apiGet(`${API_URL}/jobs`)
   )}
 
 export const useUpdateJobsMutation = () => {
   const queryClient = useQueryClient();
   return useMutation([`${API_URL}/jobs`],(payload) =>
     apiGet(`${API_URL}/jobs${payload ? `?${qs.stringify(payload)}` : ''}`),
    {
     // onMutate: async () => {
     //   await queryClient.cancelQueries("user");
 
     //   const prevUserData = queryClient.getQueryData(["user"]);
 
     //   queryClient.setQueryData(["user"], (prevData) => ({
     //     ...prevData,
     //   }));
 
     //   return { prevUserData };
     // },
     onSuccess: (newUser) => {
        console.log(newUser, 'newUser')
       queryClient.setQueryData(["jobs"], newUser);
     },
     onError: (error, payload, { prevUserData }) => {
       queryClient.setQueryData(["jobs"], prevUserData);
     },
   });
 };

 export const useCreateJobMutation = () => {
  // const queryClient = useQueryClient();
  return useMutation([`${API_URL}/jobs`],(payload) =>
    apiPost(`${API_URL}/jobs`, payload),
   {
    // onMutate: async () => {
    //   await queryClient.cancelQueries("user");

    //   const prevUserData = queryClient.getQueryData(["user"]);

    //   queryClient.setQueryData(["user"], (prevData) => ({
    //     ...prevData,
    //   }));

    //   return { prevUserData };
    // },
    // onSuccess: (newUser) => {
    //    console.log(newUser, 'newUser')
    //   queryClient.setQueryData(["jobs"], newUser);
    // },
    // onError: (error, payload, { prevUserData }) => {
    //   queryClient.setQueryData(["jobs"], prevUserData);
    // },
  });
};
 