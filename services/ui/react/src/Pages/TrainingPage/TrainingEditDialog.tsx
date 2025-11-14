import { TrainingDialog } from './TrainingDialog';
import { useGetTraining, useUpdateTraining } from 'api/trainingApi';
import { useState } from 'react';
import type { Training } from 'types/training';
import { useSnackbar } from 'Providers/SnackbarProvider/SnackbarContext';

interface TrainingEditDialogProps {
  onClose: () => void;
  open?: boolean;
  trainingId: string;
}

export const TrainingEditDialog = ({
  onClose,
  open = false,
  trainingId,
}: TrainingEditDialogProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { showSnackbar } = useSnackbar();
  const { data: training } = useGetTraining(trainingId);
  const updateTraining = useUpdateTraining(trainingId);

  const handleSave = async (updated: Training) => {
    try {
      await updateTraining.mutateAsync(updated);
      showSnackbar(`Training Course: ${updated.name} updated`);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(`Error updating training: ${err.message}`);
      }
    }
  };

  return training ? (
    <TrainingDialog
      title={'Edit Training'}
      initialValue={training}
      onSave={handleSave}
      onCancel={onClose}
      open={open}
      errorMessage={errorMessage}
    />
  ) : null;
};
