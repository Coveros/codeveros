import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetSwaggerConfig } from '../api/swaggerApi';

export const Swagger = () => {
  const { data: swaggerConfig, isLoading, error } = useGetSwaggerConfig();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
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
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        API Documentation
      </Typography>
      {/* TODO: Integrate Swagger UI component here */}
      <Typography>
        Swagger configuration loaded. Integrate swagger-ui-react component here.
      </Typography>
      <pre>{JSON.stringify(swaggerConfig, null, 2)}</pre>
    </Box>
  );
};
