import { useMutation, useQuery, useQueryClient } from "react-query";
import qs from "query-string";
import { apiGet, apiPost } from "../utils/api";
import { PORT } from '../../env.json';

const API_URL =
 PORT

export const useJobApplicationsQuery = () => {
  return useQuery(["applications"], [`${API_URL}/job/applications`], () =>
    apiGet(`${API_URL}/job/applications`)
   )}
 
 export const useUpdateJobApplicationsMutation = () => {
   const queryClient = useQueryClient();
   return useMutation([`${API_URL}/job/applications`],(id) =>
    //  apiGet(`${API_URL}/job/applications/${id ? `?${qs.stringify(payload)}` : ''}`),
     apiGet(`${API_URL}/job/applications/${id}`),
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
       queryClient.setQueryData(["applications"], newUser);
     },
     onError: (error, payload, { prevUserData }) => {
       queryClient.setQueryData(["applications"], prevUserData);
     },
   });
 };

 export const useCreateJobApplicationsMutation = () => {
  // const queryClient = useQueryClient();
  return useMutation([`${API_URL}/job/applications`],(payload) =>
    apiPost(`${API_URL}/job/applications`, payload),
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
       console.log(newUser, 'error, payload 11')
      // queryClient.setQueryData(["applications"], newUser);
    },
    onError: (newUser) => {
      // queryClient.setQueryData(["applications"], prevUserData);
      console.log(newUser, "error, payload")
      // alert('hello')
    },
  });
};
