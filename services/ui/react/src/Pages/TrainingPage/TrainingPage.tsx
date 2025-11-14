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
import { useGetTrainings } from 'api/trainingApi';
import { TrainingCreateDialog } from './TrainingCreateDialog';
import { useState } from 'react';
import { TrainingEditDialog } from './TrainingEditDialog';
import { TrainingDeleteDialog } from './TrainingDeleteDialog';

const trainingTypes = {
  presentation: 'Presentation',
  workshop: 'Workshop',
  course: 'Course',
};

type DialogMode = 'create' | 'edit' | 'delete';

export const TrainingPage = () => {
  const [dialogMode, setDialogMode] = useState<DialogMode>();
  const [selectedId, setSelectedId] = useState<string>();

  const { data: trainings, isLoading, error } = useGetTrainings();

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
        <Typography color="error">Error loading training catalog</Typography>
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
        <Typography variant="h6">Training Catalog</Typography>
        <IconButton onClick={() => handleDialogOpen('create')}>
          <AddIcon />
        </IconButton>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell># of Days</TableCell>
              <TableCell>Type</TableCell>
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
            {trainings?.map((training) => (
              <TableRow key={training._id} hover>
                <TableCell>{training.name}</TableCell>
                <TableCell>{training.description}</TableCell>
                <TableCell>{training.duration}</TableCell>
                <TableCell>{trainingTypes[training.type]}</TableCell>
                <TableCell align="right" className="table-actions">
                  <IconButton
                    onClick={() => handleDialogOpen('edit', training._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDialogOpen('delete', training._id)}
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
        <TrainingCreateDialog onClose={handleDialogClose} open={true} />
      )}
      {dialogMode === 'edit' && selectedId && (
        <TrainingEditDialog
          onClose={handleDialogClose}
          open={true}
          trainingId={selectedId}
        />
      )}
      {dialogMode === 'delete' && selectedId && (
        <TrainingDeleteDialog
          open={true}
          trainingId={selectedId}
          onClose={handleDialogClose}
        />
      )}
    </Paper>
  );
};
