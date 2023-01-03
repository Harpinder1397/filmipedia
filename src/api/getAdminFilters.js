import { useMutation, useQuery, useQueryClient } from "react-query";
import qs from "query-string";
import { apiDelete, apiGet, apiPost } from "../utils/api";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const useFiltersQuery = () => {
  return useQuery(["filters"], [`${API_URL}/filters`], () =>
    apiGet(`${API_URL}/filters`)
  );
};

export const useUpdateFilterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [`${API_URL}/filters`],
    (payload) =>
      apiGet(`${API_URL}/filters${payload ? `?${qs.stringify(payload)}` : ""}`),
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
        console.log(newUser, "newUser");
        queryClient.setQueryData(["filters"], newUser);
      },
      onError: (error, payload, { prevUserData }) => {
        queryClient.setQueryData(["filters"], prevUserData);
      },
    }
  );
};

export const useCreateFilterMutation = () => {
  // const queryClient = useQueryClient();
  const url = `${API_URL}/filters`
  const { mutate: fetchFiltersList } = useUpdateFilterMutation();
  return useMutation([`${API_URL}/filters`],(payload) =>
    apiPost(url, payload),
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
        fetchFiltersList();
        // queryClient.setQueryData(["filters"], newUser);
      },
      onError: (error, payload, { prevUserData }) => {
        // alert('HELLO')
        // queryClient.setQueryData(["filters"], prevUserData);
      },
    }
  );
};

export const UpdateFilterMutation = () => {
  // const queryClient = useQueryClient();
  const { mutate: fetchFiltersList } = useUpdateFilterMutation();
  return useMutation(
    [`${API_URL}/filters`],
    (payload) => apiPost(`${API_URL}/filters/${payload?._id}`, payload),
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
        //  console.log(newUser, 'newUser')
        fetchFiltersList();
        // queryClient.setQueryData(["filters"], newUser);
      },
      // onError: (error, payload, { prevUserData }) => {
      //   queryClient.setQueryData(["filters"], prevUserData);
      // },
    }
  );
};

export const useDeleteFilterMutation = () => {
  // const queryClient = useQueryClient();
  const { mutate: fetchFiltersList } = useUpdateFilterMutation();
  return useMutation(
    [`${API_URL}/filters`],
    (id) => apiDelete(`${API_URL}/filters/${id}`),
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
        //  console.log(newUser, 'newUser')
        // queryClient.setQueryData(["filters"], newUser);
        fetchFiltersList();
      },
      // onError: (error, payload, { prevUserData }) => {
      //   queryClient.setQueryData(["filters"], prevUserData);
      // },
    }
  );
};
