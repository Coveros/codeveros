import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetSwaggerConfig } from '../api/swaggerApi';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { useCallback } from 'react';
import { CenteredBox } from '../Layout/CenteredBox.tsx';
import type { ComponentProps } from 'react';

type SwaggerUIProps = ComponentProps<typeof SwaggerUI>;
type RequestInterceptor = SwaggerUIProps['requestInterceptor'];

export const SwaggerPage = () => {
  const { data: swaggerConfig, isLoading, error } = useGetSwaggerConfig();

  const requestInterceptor = useCallback<NonNullable<RequestInterceptor>>(
    (req) => {
      const token = localStorage.getItem('access_token');
      if (token && req.headers) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    },
    [],
  );

  if (isLoading) {
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">
          Error loading Swagger configuration
        </Typography>
      </Box>
    );
  }

  return (
    <SwaggerUI
      spec={swaggerConfig}
      requestInterceptor={requestInterceptor}
      persistAuthorization={true}
    />
  );
};
