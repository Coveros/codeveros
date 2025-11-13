import { type ChangeEvent, type FocusEvent, useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormHelperText,
  Box,
  type SelectChangeEvent,
} from '@mui/material';
import { ConfirmButton } from 'Components/ConfirmButton';
import type { User } from '../../types/user.ts';

interface UserDialogProps {
  onCancel: () => void;
  onSave: (user: User) => void;
  open: boolean;
  saving?: boolean;
  title: string;
  errorMessage?: string;
  initialValue: User;
}

export const UserDialog = ({
  onCancel,
  onSave,
  open,
  saving,
  title,
  errorMessage,
  initialValue,
}: UserDialogProps) => {
  const [user, setUser] = useState<User>(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isUsernameError = touched.username && !user.username;
  const isFirstNameError = touched.firstName && !user.firstName;
  const isLastNameError = touched.lastName && !user.lastName;
  const isEmailError = touched.email && !user.email;
  const isFormInvalid =
    !user.username || !user.firstName || !user.lastName || !user.email;

  const handleSave = () => {
    setTouched({
      username: true,
      firstName: true,
      lastName: true,
      email: true,
    });
    if (!isFormInvalid) {
      onSave(user);
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleInputChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | number>,
  ) => {
    const { name, value } = e.target;
    if (value !== '\n') {
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box component="form" sx={{ mt: 2 }}>
          <FormControl
            fullWidth
            margin="normal"
            error={isFirstNameError}
            required
          >
            <TextField
              label="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              id="user-firstname"
            />
            {isFirstNameError && (
              <FormHelperText>This is required</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={isLastNameError}
            required
          >
            <TextField
              label="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              id="user-lastname"
            />
            {isLastNameError && (
              <FormHelperText>This is required</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" error={isEmailError} required>
            <TextField
              label="Email Address"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              id="user-email"
            />
            {isEmailError && <FormHelperText>This is required</FormHelperText>}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={isUsernameError}
            required
          >
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              id="user-username"
            />
            {isUsernameError && (
              <FormHelperText>This is required</FormHelperText>
            )}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <ConfirmButton
          onClick={handleSave}
          disabled={isFormInvalid}
          processing={saving}
        />
      </DialogActions>
    </Dialog>
  );
};
