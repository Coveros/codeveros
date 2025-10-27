import {
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { type ChangeEvent, useState } from 'react';

export const ProvisionForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const validName = name.trim().length > 0;
  const validForm = validName;
  const nameError = submitted && !validName;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value);
    if (Number.isInteger(numValue) && numValue > 0) {
      setQuantity(numValue);
    }
  };

  const handleCreateSubmit = () => {
    setSubmitted(true);
    if (validForm) {
      console.log(`Creating ${quantity} training boxes with name: ${name}`);
    }
  };

  return (
    <Box sx={{ height: 1, overflow: 'auto' }}>
      <Container maxWidth="sm">
        <Stack padding={2}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="column" height={500} spacing={2}>
              <Typography variant="h5" align="center">
                Training Box Provisioner
              </Typography>
              <Stack direction="column" sx={{ flex: 1 }}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={handleNameChange}
                  margin="normal"
                  required
                  error={nameError}
                  helperText={nameError ? 'Name is required' : ''}
                />
                <TextField
                  label="Instance Count"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  margin="normal"
                  required
                />
              </Stack>
              <Divider />
              <Stack direction="column">
                <Button variant="outlined" onClick={handleCreateSubmit}>
                  Create Training Boxes
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};
