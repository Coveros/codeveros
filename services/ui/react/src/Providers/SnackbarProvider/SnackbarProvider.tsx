import { SnackbarContext, type SnackbarContextType } from './SnackbarContext';
import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { Alert, type AlertProps, Snackbar } from '@mui/material';

interface SnackbarProviderProps {
  children: ReactNode;
}

interface Toast {
  message: string;
  isOpen: boolean;
  severity: AlertProps['severity'];
}

const defaultToast: Toast = {
  message: '',
  isOpen: false,
  severity: 'success',
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [toast, setToast] = useState<Toast>(defaultToast);

  const showSnackbar = useCallback(
    (message: string, severity: AlertProps['severity'] = 'success') => {
      setToast({ message, isOpen: true, severity });
    },
    [],
  );

  const handleClose = () => {
    setToast(defaultToast);
  };

  const contextValue: SnackbarContextType = useMemo(
    () => ({
      showSnackbar,
    }),
    [showSnackbar],
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={toast.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          variant="filled"
          sx={{ width: 1 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
