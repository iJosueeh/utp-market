import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Página de Login', () => {
  it('debería renderizar todos los elementos del formulario', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/correo institucional/i)).not.toBeNull();
    expect(screen.getByLabelText(/contraseña/i)).not.toBeNull();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).not.toBeNull();
    expect(screen.getByRole('checkbox', { name: /recordarme/i })).not.toBeNull();
    expect(screen.getByText(/¿Olvidaste tu contraseña?/i)).not.toBeNull();
    expect(screen.getByText(/¿Aún no tienes una cuenta?/i)).not.toBeNull();
  });

  it('debería alternar la visibilidad de la contraseña', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/contraseña/i);
    const toggleButton = passwordInput.nextElementSibling;

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });
});