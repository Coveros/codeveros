import { createContext, useContext } from 'react';
import type { AlertProps } from '@mui/material';

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: AlertProps['severity']) => void;
}

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => null,
});

export const useSnackbar = () => useContext(SnackbarContext);

export type { SnackbarContextType };
