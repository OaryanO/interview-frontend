// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
// });

// export default axiosInstance;

import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const useAxios = () => {
  const { getToken } = useAuth();

  axiosInstance.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return axiosInstance;
};
