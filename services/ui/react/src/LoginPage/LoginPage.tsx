import { Stack, Paper, Box, Tabs, Tab } from '@mui/material';
import CoverosLogo from 'assets/coveros-logo.png';
import { Login } from './Login.tsx';
import { useState } from 'react';
import { CenteredBox } from '../Layout/CenteredBox.tsx';
import { Register } from './Register.tsx';

export const LoginPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: unknown, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <CenteredBox>
      <Paper sx={{ p: 4, width: 350 }}>
        <Stack direction="column" spacing={2}>
          <CenteredBox>
            <img
              src={CoverosLogo}
              alt="coveros logo"
              height={100}
              width={187}
            />
          </CenteredBox>
          <Tabs onChange={handleTabChange} value={tabIndex} variant="fullWidth">
            <Tab label="Sign In" />
            <Tab label="Register" />
          </Tabs>
          <Box>
            {tabIndex === 0 && <Login />}
            {tabIndex === 1 && <Register />}
          </Box>
        </Stack>
      </Paper>
    </CenteredBox>
  );
};
