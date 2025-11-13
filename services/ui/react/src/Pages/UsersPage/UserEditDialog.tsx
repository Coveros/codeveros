import { UserDialog } from './UserDialog.tsx';
import { useState } from 'react';
import { useSnackbar } from 'Providers/SnackbarProvider/SnackbarContext';
import { useGetUser, useUpdateUser } from '../../api/userApi.ts';
import type { User } from '../../types/user.ts';

interface UserEditDialogProps {
  onClose: () => void;
  open?: boolean;
  userId: string;
}

export const UserEditDialog = ({
  onClose,
  open = false,
  userId,
}: UserEditDialogProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { showSnackbar } = useSnackbar();
  const { data: user } = useGetUser(userId);
  const updateUser = useUpdateUser(userId);

  const handleSave = async (updated: User) => {
    try {
      await updateUser.mutateAsync(updated);
      showSnackbar(`User: ${updated.firstName} ${updated.lastName} updated`);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(`Error updating user: ${err.message}`);
      }
    }
  };

  return user ? (
    <UserDialog
      title={'Edit User'}
      initialValue={user}
      onSave={handleSave}
      onCancel={onClose}
      open={open}
      errorMessage={errorMessage}
    />
  ) : null;
};
