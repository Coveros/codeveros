import { Box, Typography } from '@mui/material';

export const Welcome = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ pt: 3 }}>
          Welcome to Codeveros
        </Typography>
      </Box>
    </Box>
  );
};
