import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

const fetcher: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

fetcher.interceptors.response.use(
  (resp: AxiosResponse) => {
    if (resp.status >= 200 && resp.status <= 300) {
      return resp.data;
    }
    const error: ErrorResponse = {
      message: resp.data?.message || "Server failed.",
    };
    return Promise.reject(error);
  },
  (err: AxiosError<{ detail?: string; message?: string }>) => {
    const message =
      err?.response?.data?.detail ||
      err?.response?.data?.message ||
      err?.message ||
      "Server error";

    if (typeof message === "string") {
      toast.error(message);
    } else {
      toast.error("Something went wrong.");
    }
    throw { ...err, message };
  }
);

export default fetcher;
