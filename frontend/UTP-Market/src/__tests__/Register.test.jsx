import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';

describe('Página de Registro', () => {
  it('debería renderizar todos los elementos del formulario', () => {
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

  it('debería alternar la visibilidad de la contraseña', () => {
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

  it('debería alternar la visibilidad de la contraseña de confirmación', () => {
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