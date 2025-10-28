import { Button, Stack, TextField, Typography } from '@mui/material';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useAuth } from '../AuthProvider/authContext.ts';
import { useNavigate } from 'react-router';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const submitDisabled = !username || !password || isLoggingIn;

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
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          required
          fullWidth
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={submitDisabled}
        >
          Sign In
        </Button>
      </Stack>
    </form>
  );
};
