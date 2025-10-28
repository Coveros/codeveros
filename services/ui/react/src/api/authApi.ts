import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axios';
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  Registration,
} from '../types/auth';

const checkLoggedIn = async (): Promise<AuthUser> => {
  const { data } = await axiosInstance.get<AuthUser>('/auth/loggedin');
  return data;
};

const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    '/auth/login',
    credentials,
  );
  return data;
};

const register = async (registration: Registration): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    '/auth/register',
    registration,
  );
  return data;
};

const logout = async (): Promise<void> => {
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
