import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { useAuth } from '../AuthProvider/authContext';
import CoverosLogo from 'assets/coveros-logo.png';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError('');
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

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
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <img
                src={CoverosLogo}
                alt="coveros logo"
                height={100}
                width={187}
              />
              <TextField
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                required
                fullWidth
                autoFocus
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                fullWidth
              />
              {error && (
                <Typography color="error" align="center">
                  {error}
                </Typography>
              )}
              <Button type="submit" variant="contained" fullWidth size="large">
                Sign In
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};
