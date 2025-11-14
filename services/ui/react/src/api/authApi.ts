import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axios';
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  Registration,
} from '../types/auth';

const checkLoggedIn = async () => {
  const { data } = await axiosInstance.get<AuthUser>('/auth/loggedin');
  return data;
};

const login = async (credentials: LoginRequest) => {
  const { data } = await axiosInstance.post<LoginResponse>(
    '/auth/login',
    credentials,
  );
  return data;
};

const register = async (registration: Registration) => {
  const { data } = await axiosInstance.post<LoginResponse>(
    '/auth/register',
    registration,
  );
  return data;
};

const logout = async () => {
  await axiosInstance.post<void>('/auth/logout', {});
};

export const useCheckLoggedIn = () => {
  return useQuery({
    queryKey: ['auth', 'loggedin'],
    queryFn: checkLoggedIn,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
