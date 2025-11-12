import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            The page you are looking for does not exist.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
