import { ConfirmDialog } from 'Components/ConfirmDialog';
import { useDeleteTraining, useGetTraining } from 'api/trainingApi';
import { useSnackbar } from 'Providers/SnackbarProvider/SnackbarContext';
import { useState } from 'react';

interface TrainingDeleteDialogProps {
  open: boolean;
  trainingId: string;
  onClose: () => void;
}

export const TrainingDeleteDialog = ({
  open,
  trainingId,
  onClose,
}: TrainingDeleteDialogProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data: training } = useGetTraining(trainingId);
  const deleteTraining = useDeleteTraining();
  const { showSnackbar } = useSnackbar();

  const handleConfirmDelete = async () => {
    if (!training) {
      return;
    }

    try {
      await deleteTraining.mutateAsync(trainingId);
      showSnackbar(`Training ${training.name} removed from catalog`);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage('Error deleting training');
      }
    }
  };

  return training ? (
    <ConfirmDialog
      open={open}
      title="Remove Training?"
      message={`Are you sure you want to remove ${training.name} from the catalog?`}
      errorMessage={errorMessage}
      onConfirm={handleConfirmDelete}
      onCancel={onClose}
    />
  ) : null;
};
