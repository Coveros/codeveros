import axios from 'axios';
import { environment } from '../environment.ts';

const ACCESS_TOKEN = 'access_token';

export const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem(ACCESS_TOKEN);
    }
    return error instanceof Error
      ? Promise.reject(error)
      : Promise.reject(new Error('error'));
  },
);
