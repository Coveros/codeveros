import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfirmButton } from './ConfirmButton';

describe('ConfirmButton', () => {
  it('renders with default button text "Save"', () => {
    render(<ConfirmButton />);

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});
