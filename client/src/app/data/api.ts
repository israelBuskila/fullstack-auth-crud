import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  withCredentials: true, 
});

