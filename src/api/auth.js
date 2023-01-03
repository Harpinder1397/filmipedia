import { apiPost } from "../utils/api";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const LoginAPI = (payload, setProfileCompleted) => {
  return apiPost(`${API_URL}/login`, payload)
    .then((res) => {
      if (res?.auth && res?.token) {
        if (
          res?.user?.category &&
          res.user.projects.length &&
          res.user.thumbnails.length
        ) {
          localStorage.setItem("isProfileCompleted", true);
          // setProfileCompleted(true)
        }
        localStorage.setItem("token", res?.token);
        localStorage.setItem("user", res?.user?._id);
        localStorage.setItem("userName", res?.user?.fullName);
        localStorage.setItem("userType", res?.user?.type);
        return res?.auth;
      }
    })
    .catch((error) => {
      console.log("error", error);
      return 0;
    });
};
