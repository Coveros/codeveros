import { Button, type ButtonProps, CircularProgress } from '@mui/material';

interface ConfirmButtonProps {
  text?: string;
  onClick?: ButtonProps['onClick'];
  disabled?: boolean;
  processing?: boolean;
}

export const ConfirmButton = ({
  text = 'Save',
  onClick,
  disabled = false,
  processing = false,
}: ConfirmButtonProps) => {
  return (
    <Button onClick={onClick} disabled={disabled || processing}>
      {processing && (
        <CircularProgress
          color="primary"
          size={16}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            mt: '-8px',
            ml: '-8px',
          }}
        />
      )}
      {text}
    </Button>
  );
};
