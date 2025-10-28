import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from './axios';
import type { User } from '../types/user';

const fetchAllUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>('/user');
  return data;
};

const fetchUser = async (id: string): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`/user/${id}`);
  return data;
};

const createUser = async (newUser: User): Promise<User> => {
  const { data } = await axiosInstance.post<User>('/user', newUser);
  return data;
};

const updateUser = async ({
  id,
  user,
}: {
  id: string;
  user: Partial<User>;
}): Promise<User> => {
  const { data } = await axiosInstance.put<User>(`/user/${id}`, user);
  return data;
};

const deleteUser = async (id: string): Promise<User> => {
  const { data } = await axiosInstance.delete<User>(`/user/${id}`);
  return data;
};

export const useGetAllUsers = () => {
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

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
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
