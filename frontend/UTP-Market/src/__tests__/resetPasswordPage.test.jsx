import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import ResetPasswordPage from '../pages/features/forgotPassword/resetPasswordPage';

describe('Página de ResetPassword', () => {
  afterEach(cleanup);

  it('debería renderizar el formulario correctamente', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Recuperar Contraseña/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo institucional/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
  });

  it('debería tener un enlace para volver a la página principal', () => {
    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>
    );
    const backLink = screen.getByRole('link', { name: /Volver al inicio/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });
});
