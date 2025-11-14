import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { UserCreateDialog } from './UserCreateDialog.tsx';
import { useState } from 'react';
import { UserEditDialog } from './UserEditDialog.tsx';
import { UserDeleteDialog } from './UserDeleteDialog.tsx';
import { useGetUsers } from 'api/userApi.ts';

type DialogMode = 'create' | 'edit' | 'delete';

export const UsersPage = () => {
  const [dialogMode, setDialogMode] = useState<DialogMode>();
  const [selectedId, setSelectedId] = useState<string>();

  const { data: users, isLoading, error } = useGetUsers();

  const handleDialogOpen = (mode: DialogMode, id?: string) => {
    setDialogMode(mode);
    setSelectedId(id);
  };

  const handleDialogClose = () => {
    setDialogMode(undefined);
    setSelectedId(undefined);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">Error loading users</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ m: 2 }} elevation={4}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pt: 2, px: 3 }}
        mb={2}
      >
        <Typography variant="h6">User List</Typography>
        <IconButton onClick={() => handleDialogOpen('create')}>
          <AddIcon />
        </IconButton>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '.table-actions button': {
                visibility: 'hidden',
              },
              'tr:hover .table-actions button': {
                visibility: 'visible',
              },
            }}
          >
            {users?.map((user) => (
              <TableRow key={user._id} hover>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right" className="table-actions">
                  <IconButton
                    onClick={() => handleDialogOpen('edit', user._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDialogOpen('delete', user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {dialogMode === 'create' && (
        <UserCreateDialog onClose={handleDialogClose} open={true} />
      )}
      {dialogMode === 'edit' && selectedId && (
        <UserEditDialog
          onClose={handleDialogClose}
          open={true}
          userId={selectedId}
        />
      )}
      {dialogMode === 'delete' && selectedId && (
        <UserDeleteDialog
          open={true}
          userId={selectedId}
          onClose={handleDialogClose}
        />
      )}
    </Paper>
  );
};
