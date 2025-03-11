import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  withCredentials: true, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        window.location.href = "/"; 
      }
    }

    return Promise.reject(error);
  }
);