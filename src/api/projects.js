// import { useMutation, useQuery, useQueryClient } from 'react-query';
import { apiDelete, apiGet, apiPost } from "../utils/api";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const createProjectApi = (payload) => {
  const url = `${API_URL}/projects`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getProjectsApi = (id) => {
  const url = `${API_URL}/projects/${id}`;
  return apiGet(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateProjectApi = (id, payload) => {
  const url = `${API_URL}/projects/${id}`;
  return apiPost(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteProjectApi = (id) => {
  const url = `${API_URL}/projects/${id}`;
  return apiDelete(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};


// useQuery get all projects list  ( get method )
// export const useStatesQuery = () => {
//   return useQuery(["projects"],[`${API_URL}/projects`],() =>
//   apiGet(`${API_URL}/projects`),
// )}

// useQuery update state ( post method )
// export const useUpdateStatesMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation([`${API_URL}/projects`],(payload) =>
//   payload ?
//     apiPost(`${API_URL}/projects/${payload._id}`, payload) :
//     apiGet(`${API_URL}/projects`),
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
//       queryClient.setQueryData(["projects"], data);
//     },
//     onError: (error, payload, { prevUserData }) => {
//       queryClient.setQueryData(["projects"], prevUserData);
//     },
//   });
// };

// export const useDeleteStatesMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation([`${API_URL}/projects`],(id) =>
//     apiPost(`${API_URL}/projects/${id}`),
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
//       queryClient.setQueryData(["projects"], newUser);
//     },
//     onError: (error, payload, { prevUserData }) => {
//       queryClient.setQueryData(["projects"], prevUserData);
//     },
//   });
// };
