import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_TIME_OUT_AXIOS,
  headers: {
    "Content-Type": "application/json",
  },
});
