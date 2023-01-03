import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiDelete, apiGet, apiPost } from "../utils/api";
import qs from "query-string";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const createStateApi = (payload) => {
  const url = `${API_URL}/states`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

// export const getStatesApi = (payload) => {
//   const url = `${API_URL}/states${payload ? `?${qs.stringify(payload)}` : ''}`
//   return apiGet(url)
//   .then((res) => {
//       return res;
//     }
//   )
//   .catch((error) => {
//     return error;
//   });
// };

// export const getStatesSearchApi = (payload) => {
//   const url = `${API_URL}/states/search${payload ? `?${qs.stringify(payload)}` : ''}`
//   return apiGet(url)
//   .then((res) => {
//       return res;
//     }
//   )
//   .catch((error) => {
//     return error;
//   });
// };

export const updateStatesApi = (id, payload) => {
  const url = `${API_URL}/states/${id}`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteStateApi = (id) => {
  const url = `${API_URL}/states/${id}`;
  return apiDelete(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

// useQuery get all states list  ( get method )
// export const useStatesQuery = () => {
//   return useQuery(["states"],[`${API_URL}/states`],() =>
//   apiGet(`${API_URL}/states`),
// )}

// useQuery update state ( post method )
// export const useUpdateStatesMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation([`${API_URL}/states`],(payload) =>
//   payload ?
//     apiPost(`${API_URL}/states/${payload._id}`, payload) :
//     apiGet(`${API_URL}/states`),
//    {
//     onMutate: async () => {
//       await queryClient.cancelQueries("user");

//       const prevUserData = queryClient.getQueryData(["user"]);

//       queryClient.setQueryData(["user"], (prevData) => ({
//         ...prevData,
//       }));

//       return { prevUserData };
//     },
//     onSuccess: async (newUser) => {
//       const data = await getStatesApi();
//       queryClient.setQueryData(["states"], data);
//     },
//     onError: (error, payload, { prevUserData }) => {
//       queryClient.setQueryData(["states"], prevUserData);
//     },
//   });
// };

// export const useDeleteStatesMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation([`${API_URL}/states`],(id) =>
//     apiPost(`${API_URL}/states/${id}`),
//    {
//     // onMutate: async () => {
//     //   await queryClient.cancelQueries("user");

//     //   const prevUserData = queryClient.getQueryData(["user"]);

//     //   queryClient.setQueryData(["user"], (prevData) => ({
//     //     ...prevData,
//     //   }));

//     //   return { prevUserData };
//     // },
//     onSuccess: (newUser) => {
//       queryClient.setQueryData(["states"], newUser);
//     },
//     onError: (error, payload, { prevUserData }) => {
//       queryClient.setQueryData(["states"], prevUserData);
//     },
//   });
// };
