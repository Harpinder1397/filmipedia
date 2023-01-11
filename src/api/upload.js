import { apiDelete, apiPost } from "../utils/api";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const uploadApi = (userId, file) => {
  const url = `${API_URL}/upload/${userId}`;
  return apiPost(url, file)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteImgApi = (imgUrl) => {
  const url = `${API_URL}/upload/delete?url=${imgUrl.url}`;
  return apiDelete(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const uploadVideoApi = (userId, file) => {
  const url = `${API_URL}/upload/video/${userId}`;
  return apiPost(url, file)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteVideoApi = (imgUrl) => {
  const url = `${API_URL}/upload/video/delete?url=${imgUrl.url}`;
  return apiDelete(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};