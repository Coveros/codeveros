import { ConfirmDialog } from 'Components/ConfirmDialog';
import { useSnackbar } from 'Providers/SnackbarProvider/SnackbarContext';
import { useState } from 'react';
import { useDeleteUser, useGetUser } from 'api/userApi.ts';

interface UserDeleteDialogProps {
  open: boolean;
  userId: string;
  onClose: () => void;
}

export const UserDeleteDialog = ({
  open,
  userId,
  onClose,
}: UserDeleteDialogProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data: user } = useGetUser(userId);
  const deleteUser = useDeleteUser();
  const { showSnackbar } = useSnackbar();

  const handleConfirmDelete = async () => {
    if (!user) {
      return;
    }

    try {
      await deleteUser.mutateAsync(userId);
      showSnackbar(`User ${user.firstName} ${user.lastName} removed`);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage('Error deleting user');
      }
    }
  };

  return user ? (
    <ConfirmDialog
      open={open}
      title="Remove User?"
      message={`Are you sure you want to remove ${user.firstName} ${user.lastName}?`}
      errorMessage={errorMessage}
      onConfirm={handleConfirmDelete}
      onCancel={onClose}
    />
  ) : null;
};
