import { type ChangeEvent, type FocusEvent, useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  type SelectChangeEvent,
} from '@mui/material';
import { ConfirmButton } from 'Components/ConfirmButton';
import type { Training } from 'types/training';

interface TypeOption {
  value: string;
  viewValue: string;
  id: string;
}

interface DurationOption {
  value: number;
  viewValue: string;
  id: string;
}

interface TrainingDialogProps {
  onCancel: () => void;
  onSave: (training: Training) => void;
  open: boolean;
  saving?: boolean;
  title: string;
  errorMessage?: string;
  initialValue: Training;
}

const typeOptions: TypeOption[] = [
  {
    value: 'presentation',
    viewValue: 'Presentation',
    id: 'type-option-presentation',
  },
  { value: 'workshop', viewValue: 'Workshop', id: 'type-option-workshop' },
  { value: 'course', viewValue: 'Course', id: 'type-option-course' },
];

const durationOptions: DurationOption[] = [
  { value: 0.5, viewValue: '0.5', id: 'duration-option-0.5' },
  { value: 1, viewValue: '1', id: 'duration-option-1' },
  { value: 2, viewValue: '2', id: 'duration-option-2' },
  { value: 3, viewValue: '3', id: 'duration-option-3' },
  { value: 4, viewValue: '4', id: 'duration-option-4' },
  { value: 5, viewValue: '5', id: 'duration-option-5' },
];

export const TrainingDialog = ({
  onCancel,
  onSave,
  open,
  saving,
  title,
  errorMessage,
  initialValue,
}: TrainingDialogProps) => {
  const [training, setTraining] = useState<Training>(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isNameError = touched.name && !training.name;
  const isDescriptionError = touched.description && !training.description;
  const isTypeError = touched.type && !training.type;
  const isDurationError = touched.duration && !training.duration;
  const isFormInvalid =
    !training.name ||
    !training.description ||
    !training.type ||
    !training.duration;

  const handleSave = () => {
    setTouched({ name: true, description: true, type: true, duration: true });
    if (!isFormInvalid) {
      onSave(training);
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
      setTraining((prevState: Training) => ({
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
          <FormControl fullWidth margin="normal" error={isNameError} required>
            <TextField
              label="Name"
              name="name"
              value={training.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={isNameError}
              required
              id="training-name"
            />
            {isNameError && <FormHelperText>This is required</FormHelperText>}
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={isDescriptionError}
            required
          >
            <TextField
              label="Description"
              name="description"
              value={training.description}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={isDescriptionError}
              required
              multiline
              minRows={1}
              maxRows={10}
              id="training-description"
            />
            {isDescriptionError && (
              <FormHelperText>This is required</FormHelperText>
            )}
          </FormControl>
          <Stack direction="row" spacing={2} mt={2}>
            <FormControl fullWidth error={isTypeError} required>
              <InputLabel id="training-type-label">Type</InputLabel>
              <Select
                labelId="training-type-label"
                name="type"
                value={training.type}
                label="Type"
                error={isTypeError}
                onChange={handleInputChange}
                onBlur={handleBlur}
                id="training-type"
              >
                {typeOptions.map((option) => (
                  <MenuItem value={option.value} key={option.id} id={option.id}>
                    {option.viewValue}
                  </MenuItem>
                ))}
              </Select>
              {isTypeError && <FormHelperText>This is required</FormHelperText>}
            </FormControl>
            <FormControl fullWidth error={isDurationError} required>
              <InputLabel id="training-duration-label">
                Duration (# of Days)
              </InputLabel>
              <Select
                labelId="training-duration-label"
                name="duration"
                value={training.duration}
                label="Duration (# of Days)"
                error={isDurationError}
                onChange={handleInputChange}
                onBlur={handleBlur}
                id="training-duration"
              >
                {durationOptions.map((option) => (
                  <MenuItem value={option.value} key={option.id} id={option.id}>
                    {option.viewValue}
                  </MenuItem>
                ))}
              </Select>
              {isDurationError && (
                <FormHelperText>This is required</FormHelperText>
              )}
            </FormControl>
          </Stack>
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
