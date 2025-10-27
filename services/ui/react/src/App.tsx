import { ProvisionForm } from './ProvisionForm/ProvisionForm';
import { AppBar, Box, Toolbar, Stack, Typography } from '@mui/material';

export const App = () => {
  return (
    <Stack sx={{ height: '100vh', width: '100vw' }} direction="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Codeveros</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ overflow: 'auto', flex: 1, pt: 1 }}>
        <ProvisionForm />
      </Box>
    </Stack>
  );
};
