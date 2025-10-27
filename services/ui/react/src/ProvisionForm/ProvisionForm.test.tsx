import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';

import { ProvisionForm } from './ProvisionForm';

const renderProvisionForm = () => {
  render(<ProvisionForm />);
  return {
    titleInput: screen.getByText('Training Box Provisioner'),
    nameInput: screen.getByRole<HTMLInputElement>('textbox', {
      name: /name/i,
    }),
    quantityInput: screen.getByRole<HTMLInputElement>('spinbutton', {
      name: /instance count/i,
    }),
    submitButton: screen.getByRole('button', {
      name: /create training boxes/i,
    }),
  };
};

describe('ProvisionForm', () => {
  test('renders form elements correctly', () => {
    const { nameInput, quantityInput, submitButton, titleInput } =
      renderProvisionForm();

    expect(titleInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('allows user to enter name and has quantity field', async () => {
    const user = userEvent.setup();
    const { nameInput, quantityInput } = renderProvisionForm();

    await user.type(nameInput, 'test-box');

    expect(nameInput.value).toBe('test-box');
    expect(quantityInput.value).toBe('1');
  });

  test('shows validation error when name is empty and form is submitted', async () => {
    const user = userEvent.setup();
    const { submitButton } = renderProvisionForm();

    await user.click(submitButton);

    expect(screen.getByText('Name is required')).toBeTruthy();
  });
});
