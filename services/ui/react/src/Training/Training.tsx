import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Typography,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useGetTrainings, useDeleteTraining } from '../api/trainingApi';

export const Training = () => {
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
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Training Catalog</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Open create training dialog
            console.log('Add training');
          }}
        >
          Add Course
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Duration (Days)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainings?.map((training) => (
              <TableRow key={training._id}>
                <TableCell>{training.name}</TableCell>
                <TableCell>{training.description}</TableCell>
                <TableCell>{training.type}</TableCell>
                <TableCell>{training.duration}</TableCell>
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
    </Box>
  );
};
