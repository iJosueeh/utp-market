import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';

describe('Register page', () => {
  it('should render all form elements', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/nombres/i)).not.toBeNull();
    expect(screen.getByLabelText(/apellidos/i)).not.toBeNull();
    expect(screen.getByLabelText(/correo electrónico/i)).not.toBeNull();
    expect(screen.getByLabelText('Contraseña')).not.toBeNull();
    expect(screen.getByLabelText(/confirmar contraseña/i)).not.toBeNull();
    expect(screen.getByRole('button', { name: /registrarse/i })).not.toBeNull();
    expect(screen.getByRole('checkbox', { name: /recordarme/i })).not.toBeNull();
    expect(screen.getByText(/¿Ya tienes una cuenta?/i)).not.toBeNull();
  });

  it('should toggle password visibility', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText('Contraseña');
    const toggleButton = passwordInput.nextElementSibling;

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('should toggle confirm password visibility', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const toggleButton = confirmPasswordInput.nextElementSibling;

    expect(confirmPasswordInput.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(confirmPasswordInput.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(confirmPasswordInput.type).toBe('password');
  });
});
