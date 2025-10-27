import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axios';

export type SwaggerConfig = Record<string, unknown>;

const fetchSwaggerConfig = async (): Promise<SwaggerConfig> => {
  const { data } = await axiosInstance.get<SwaggerConfig>('/docs');
  return data;
};

export const useGetSwaggerConfig = () => {
  return useQuery({
    queryKey: ['swagger', 'config'],
    queryFn: fetchSwaggerConfig,
    staleTime: 10 * 60 * 1000, // 10 minutes - swagger config doesn't change often
  });
};
