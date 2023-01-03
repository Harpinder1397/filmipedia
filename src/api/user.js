import { apiPost, apiGet } from "../utils/api";
import qs from "query-string";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const useUserQuery = () => {
  return useQuery(["user"], [`${API_URL}/user`], () =>
    apiGet(`${API_URL}/user`)
  );
};

export const useUpdateUserNameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [`${API_URL}/user`],
    (payload) =>
      apiGet(`${API_URL}/user${payload ? `?${qs.stringify(payload)}` : ""}`),
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
        queryClient.setQueryData(["user"], newUser);
      },
      onError: (error, payload, { prevUserData }) => {
        queryClient.setQueryData(["user"], prevUserData);
      },
    }
  );
};

// export const usePostRegistration = () => {
//   const context = useMutation([`${API_URL}/user`], (payload) =>
//     apiGet(`${API_URL}/user${payload ? `?${qs.stringify(payload)}` : ''}`)
//   );
//   return context;
// };

export const createUserApi = (payload) => {
  return apiPost(`${API_URL}/user`, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllUsersApi = (payload) => {
  const url = `${API_URL}/user${payload ? `?${qs.stringify(payload)}` : ""}`;
  return apiGet(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateUserApi = (userId, payload) => {
  return apiPost(`${API_URL}/user/${userId}`, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getUserApi = (userId) => {
  return apiGet(`${API_URL}/user/${userId}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateProjectsApi = (userId, payload) => {
  return apiPost(`${API_URL}/user/${userId}/projects`, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateThumbnailsApi = (userId, payload) => {
  return apiPost(`${API_URL}/user/${userId}/thumbnails`, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};


// new 


export const useGetUserDataQuery = () => {
  return useQuery(["userInfo"], [`${API_URL}/user`], () =>
    apiGet(`${API_URL}/user`)
  );
};

export const useGetUserQuery = () => {
  const queryClient = useQueryClient();
  return useMutation([`${API_URL}/user`],(userId) =>
    apiGet(`${API_URL}/user/${userId}`),
   {
      onSuccess: (newUser) => {
        //  console.log(newUser, 'newUser')
        queryClient.setQueryData(["userInfo"], newUser);
      },
      onError: (error, payload, { prevUserData }) => {
        queryClient.setQueryData(["userInfo"], prevUserData);
      },
    }
  );
};
