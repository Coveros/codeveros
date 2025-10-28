import { useState, type FormEvent, type ChangeEvent, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { useAuth } from '../AuthProvider/authContext';

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const { register, isRegistering } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage('');
  };

  const validateForm = (): boolean => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return false;
    }

    // Password match validation
    return formData.password === formData.confirmPassword;
  };

  const passwordMatchError = useMemo(() => {
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      return 'Passwords must match';
    }
    return '';
  }, [formData.password, formData.confirmPassword]);

  const emailError = useMemo(() => {
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return 'A valid email address is required';
      }
    }
    return '';
  }, [formData.email]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setMessage('Trying to register...');

    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        navigate('/');
      } else {
        setMessage('Failed registration');
      }
    } catch {
      setMessage('Failed registration');
    }
  };

  const isFormValid = validateForm();
  const registerDisabled = isRegistering || !isFormValid;

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} sx={{ pt: 2 }}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          fullWidth
          id="register-firstname"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          fullWidth
          id="register-lastname"
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          fullWidth
          id="register-username"
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          fullWidth
          id="register-email"
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          fullWidth
          autoComplete="new-password"
          id="register-password"
        />
        <TextField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          fullWidth
          autoComplete="new-password"
          id="register-confirm-password"
          error={!!passwordMatchError}
          helperText={passwordMatchError}
        />
        {message && (
          <Typography
            align="center"
            color={isRegistering ? 'text.secondary' : 'error'}
          >
            {message}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={registerDisabled}
          id="register-button"
        >
          Register
        </Button>
      </Stack>
    </form>
  );
};
