import { TrainingDialog } from './TrainingDialog';
import type { Training } from 'types/training';
import { useCreateTraining } from 'api/trainingApi';
import { useState } from 'react';
import { useSnackbar } from 'Providers/SnackbarProvider/SnackbarContext';

interface TrainingCreateDialogProps {
  onClose: () => void;
  open?: boolean;
}

const initialValue: Training = {
  name: '',
  description: '',
  duration: 1,
  type: 'presentation',
};

export const TrainingCreateDialog = ({
  onClose,
  open = false,
}: TrainingCreateDialogProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { showSnackbar } = useSnackbar();
  const createTraining = useCreateTraining();

  const handleSave = async (newTraining: Training) => {
    try {
      await createTraining.mutateAsync(newTraining);
      showSnackbar(`Training Course: ${newTraining.name} added to catalog`);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(`Error creating training: ${err.message}`);
      }
    }
    onClose();
  };

  return (
    <TrainingDialog
      title={'Add Training'}
      initialValue={initialValue}
      onSave={handleSave}
      onCancel={onClose}
      open={open}
      errorMessage={errorMessage}
    />
  );
};
