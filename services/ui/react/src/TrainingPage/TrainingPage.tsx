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
import { useGetTrainings, useDeleteTraining } from '../api/trainingApi';

const trainingTypes = {
  presentation: 'Presentation',
  workshop: 'Workshop',
};

export const TrainingPage = () => {
  const { data: trainings, isLoading, error } = useGetTrainings();
  const deleteTrainingMutation = useDeleteTraining();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      await deleteTrainingMutation.mutateAsync(id);
    }
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
        <Typography color="error">Error loading trainings</Typography>
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
        <IconButton onClick={() => null}>
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
          <TableBody>
            {trainings?.map((training) => (
              <TableRow key={training._id} hover>
                <TableCell>{training.name}</TableCell>
                <TableCell>{training.description}</TableCell>
                <TableCell>{training.duration}</TableCell>
                <TableCell>{trainingTypes[training.type]}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      // TODO: Open edit training dialog
                      console.log('Edit training', training._id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => training._id && handleDelete(training._id)}
                    disabled={deleteTrainingMutation.isPending}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
