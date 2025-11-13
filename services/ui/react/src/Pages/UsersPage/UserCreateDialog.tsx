import { UserDialog } from './UserDialog.tsx';
import { useState } from 'react';
import { useSnackbar } from 'Providers/SnackbarProvider/SnackbarContext';
import type { User } from '../../types/user.ts';
import { useCreateUser } from '../../api/userApi.ts';

interface UserCreateDialogProps {
  onClose: () => void;
  open?: boolean;
}

const initialValue: User = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
};

export const UserCreateDialog = ({
  onClose,
  open = false,
}: UserCreateDialogProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { showSnackbar } = useSnackbar();
  const createUser = useCreateUser();

  const handleSave = async (newUser: User) => {
    try {
      await createUser.mutateAsync(newUser);
      showSnackbar(`User: ${newUser.firstName} ${newUser.lastName} added`);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(`Error creating user: ${err.message}`);
      }
    }
    onClose();
  };

  return (
    <UserDialog
      title={'Add User'}
      initialValue={initialValue}
      onSave={handleSave}
      onCancel={onClose}
      open={open}
      errorMessage={errorMessage}
    />
  );
};
