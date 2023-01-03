import { useMutation, useQuery, useQueryClient } from "react-query";
import qs from "query-string";
import { apiGet, apiPost } from "../utils/api";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const useJobApplicationsQuery = () => {
  return useQuery(["applications"], [`${API_URL}/job/applications`], () =>
    apiGet(`${API_URL}/job/applications`)
   )}

export const useJobAllApplicationsQuery = () => {
  return useQuery(["allApplications"], [`${API_URL}/job/applications`], () =>
    apiGet(`${API_URL}/job/applications`)
    )}
 
export const useJobAllApplicationsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation([`${API_URL}/job/applications`],() =>
    //  apiGet(`${API_URL}/job/applications/${id ? `?${qs.stringify(payload)}` : ''}`),
    apiGet(`${API_URL}/job/applications`),
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
      queryClient.setQueryData(["allApplications"], newUser);
    },
    onError: (error, payload, { prevUserData }) => {
      queryClient.setQueryData(["allApplications"], prevUserData);
    },
  });
};

 export const useUpdateJobApplicationsMutation = () => {
   const queryClient = useQueryClient();
   return useMutation([`${API_URL}/job/applications`],(payload) =>
    //  apiGet(`${API_URL}/job/applications/${id ? `?${qs.stringify(payload)}` : ''}`),
     apiGet(`${API_URL}/job/applications/${payload ? `?${qs.stringify(payload)}` : ""}`),
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
       queryClient.setQueryData(["applications"], newUser);
     },
     onError: (error, payload, { prevUserData }) => {
       queryClient.setQueryData(["applications"], prevUserData);
     },
   });
 };

 export const useCreateJobApplicationsMutation = () => {
  // const queryClient = useQueryClient();
  const { mutate: getAllApplicationsMutation } = useJobAllApplicationsMutation();

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
       getAllApplicationsMutation();
      // queryClient.setQueryData(["applications"], newUser);
    },
    onError: (newUser) => {
      // queryClient.setQueryData(["applications"], prevUserData);
      // alert('hello')
    },
  });
};
