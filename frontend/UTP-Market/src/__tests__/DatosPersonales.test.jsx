import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import DatosPersonales from '../pages/Usuario/DatosPersonales';
// import { UserProvider } from '../context/UserContext'; // No longer needed to import UserProvider directly
import * as authService from '../services/authService';
import { useAuth } from '../hooks/useAuth'; // Import useAuth

// Mock authService
vi.mock('../services/authService', () => ({
  getProfile: vi.fn(() => Promise.resolve({
    nombre: 'John',
    apellido: 'Doe',
    email: 'john.doe@example.com',
    telefono: '123-456-7890',
    // password: '***asd', // Not returned by getProfile
  })),
  updateProfile: vi.fn((profileData) => Promise.resolve(profileData)),
}));

// Mock useAuth hook
vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('DatosPersonales', () => {
  const mockUser = {
    nombre: 'John',
    apellido: 'Doe',
    email: 'john.doe@example.com',
    telefono: '123-456-7890',
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    useAuth.mockReturnValue({
      user: mockUser,
      login: vi.fn(),
      logout: vi.fn(),
      loading: false,
      token: 'mock-token', // Provide a token to trigger useEffect in DatosPersonales
    });
  });

  test('renderiza el componente con los datos iniciales del usuario', async () => {
    render(<DatosPersonales />);

    // Use findByLabelText which waits for the element to appear with the expected value
    expect(await screen.findByLabelText('Nombres')).toHaveValue('John');
    expect(await screen.findByLabelText('Apellidos')).toHaveValue('Doe');
    expect(await screen.findByLabelText('Email')).toHaveValue('john.doe@example.com');
    expect(await screen.findByLabelText('Teléfono')).toHaveValue('123-456-7890');
  });

  test('los campos del formulario son de solo lectura por defecto', async () => {
    render(<DatosPersonales />);

    // Wait for the component to render with initial data before asserting readOnly
    expect(await screen.findByLabelText('Nombres')).toHaveAttribute('readOnly');
    expect(await screen.findByLabelText('Apellidos')).toHaveAttribute('readOnly');
    expect(await screen.findByLabelText('Teléfono')).toHaveAttribute('readOnly');
    expect(await screen.findByLabelText('Contraseña')).toHaveAttribute('readOnly');
  });

  test('habilita la edición cuando se hace clic en el botón "Editar datos"', async () => {
    render(<DatosPersonales />);
    
    const editarButton = await screen.findByText('Editar datos'); // Wait for the button to appear
    fireEvent.click(editarButton);

    expect(await screen.findByLabelText('Nombres')).not.toHaveAttribute('readOnly');
    expect(screen.getByLabelText('Apellidos')).not.toHaveAttribute('readOnly');
    expect(screen.getByLabelText('Teléfono')).not.toHaveAttribute('readOnly');
    expect(screen.getByLabelText('Contraseña')).not.toHaveAttribute('readOnly');
  });

  test('actualiza el estado cuando se cambian los campos del formulario', async () => {
    render(<DatosPersonales />);
    
    const editarButton = await screen.findByText('Editar datos');
    fireEvent.click(editarButton);

    const nombreInput = await screen.findByLabelText('Nombres');
    fireEvent.change(nombreInput, { target: { value: 'Jane' } });

    expect(nombreInput).toHaveValue('Jane');
  });

  test('descarta los cambios y deshabilita la edición cuando se hace clic en el botón "Cancelar"', async () => {
    render(<DatosPersonales />);
    
    const editarButton = await screen.findByText('Editar datos');
    fireEvent.click(editarButton);

    const nombreInput = await screen.findByLabelText('Nombres');
    fireEvent.change(nombreInput, { target: { value: 'Jane' } });

    const cancelarButton = screen.getByText('Cancelar');
    fireEvent.click(cancelarButton);

    expect(await screen.findByLabelText('Nombres')).toHaveValue('John');
    expect(screen.getByLabelText('Nombres')).toHaveAttribute('readOnly');
  });

  test('envía el formulario con los datos actualizados', async () => {
    render(<DatosPersonales />);
    
    const editarButton = await screen.findByText('Editar datos');
    fireEvent.click(editarButton);

    const nombreInput = await screen.findByLabelText('Nombres');
    fireEvent.change(nombreInput, { target: { value: 'Jane' } });

    const guardarButton = screen.getByText('Guardar Cambios');
    fireEvent.click(guardarButton);

    await waitFor(() => {
      expect(authService.updateProfile).toHaveBeenCalledWith({
        nombre: 'Jane',
        apellido: 'Doe',
        email: 'john.doe@example.com',
        telefono: '123-456-7890',
        password: '', // Include the empty password field
      });
      expect(screen.getByLabelText('Nombres')).toHaveValue('Jane');
      expect(screen.getByLabelText('Nombres')).toHaveAttribute('readOnly');
    });
  });

  test('intercala la visibilidad de la contraseña', async () => {
    render(<DatosPersonales />);
    
    const passwordInput = await screen.findByLabelText('Contraseña');
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
