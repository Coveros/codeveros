import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from './axios';
import type { Training } from '../types/training';

const fetchAllTrainings = async (): Promise<Training[]> => {
  const { data } = await axiosInstance.get<Training[]>('/training');
  return data;
};

const fetchTraining = async (id: string): Promise<Training> => {
  const { data } = await axiosInstance.get<Training>(`/training/${id}`);
  return data;
};

const createTraining = async (newTraining: Training): Promise<Training> => {
  const { data } = await axiosInstance.post<Training>('/training', newTraining);
  return data;
};

const updateTraining = async ({
  id,
  training,
}: {
  id: string;
  training: Partial<Training>;
}): Promise<Training> => {
  const { data } = await axiosInstance.put<Training>(
    `/training/${id}`,
    training,
  );
  return data;
};

const deleteTraining = async (id: string): Promise<Training> => {
  const { data } = await axiosInstance.delete<Training>(`/training/${id}`);
  return data;
};

export const useGetTrainings = () => {
  return useQuery({
    queryKey: ['trainings'],
    queryFn: fetchAllTrainings,
  });
};

export const useGetTraining = (id: string) => {
  return useQuery({
    queryKey: ['trainings', id],
    queryFn: () => fetchTraining(id),
    enabled: !!id,
  });
};

export const useCreateTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainings'] });
    },
  });
};

export const useUpdateTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTraining,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trainings'] });
      queryClient.invalidateQueries({ queryKey: ['trainings', data._id] });
    },
  });
};

export const useDeleteTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainings'] });
    },
  });
};
