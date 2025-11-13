import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from './axios';
import type { User } from '../types/user';

const fetchAllUsers = async () => {
  const { data } = await axiosInstance.get<User[]>('/user');
  return data;
};

const fetchUser = async (id: string) => {
  const { data } = await axiosInstance.get<User>(`/user/${id}`);
  return data;
};

const createUser = async (newUser: User) => {
  const { data } = await axiosInstance.post<User>('/user', newUser);
  return data;
};

const updateUser = async (id: string, user: Partial<User>) => {
  const { data } = await axiosInstance.put<User>(`/user/${id}`, user);
  return data;
};

const deleteUser = async (id: string) => {
  const { data } = await axiosInstance.delete<User>(`/user/${id}`);
  return data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => updateUser(id, data),
    onSuccess: (data) => {
      // Invalidate and refetch users list and specific user
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', data._id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
