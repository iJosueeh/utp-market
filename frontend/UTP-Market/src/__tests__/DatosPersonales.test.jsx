import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import DatosPersonales from '../pages/Usuario/DatosPersonales';

describe('DatosPersonales', () => {
  test('renderiza el componente con los datos iniciales del usuario', () => {
    render(<DatosPersonales />);

    expect(screen.getByLabelText('Nombres')).toHaveValue('John');
    expect(screen.getByLabelText('Apellidos')).toHaveValue('Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john.doe@example.com');
    expect(screen.getByLabelText('Teléfono')).toHaveValue('123-456-7890');
    expect(screen.getByLabelText('Contraseña')).toHaveValue('***asd');
  });

  test('los campos del formulario son de solo lectura por defecto', () => {
    render(<DatosPersonales />);

    expect(screen.getByLabelText('Nombres')).toHaveAttribute('readOnly');
    expect(screen.getByLabelText('Apellidos')).toHaveAttribute('readOnly');
    expect(screen.getByLabelText('Teléfono')).toHaveAttribute('readOnly');
    expect(screen.getByLabelText('Contraseña')).toHaveAttribute('readOnly');
  });

  test('habilita la edición cuando se hace clic en el botón "Editar datos"', () => {
    render(<DatosPersonales />);
    
    const editarButton = screen.getByText('Editar datos');
    fireEvent.click(editarButton);

    expect(screen.getByLabelText('Nombres')).not.toHaveAttribute('readOnly');
    expect(screen.getByLabelText('Apellidos')).not.toHaveAttribute('readOnly');
    expect(screen.getByLabelText('Teléfono')).not.toHaveAttribute('readOnly');
    expect(screen.getByLabelText('Contraseña')).not.toHaveAttribute('readOnly');
  });

  test('actualiza el estado cuando se cambian los campos del formulario', () => {
    render(<DatosPersonales />);
    
    const editarButton = screen.getByText('Editar datos');
    fireEvent.click(editarButton);

    const nombreInput = screen.getByLabelText('Nombres');
    fireEvent.change(nombreInput, { target: { value: 'Jane' } });

    expect(nombreInput).toHaveValue('Jane');
  });

  test('descarta los cambios y deshabilita la edición cuando se hace clic en el botón "Cancelar"', () => {
    render(<DatosPersonales />);
    
    const editarButton = screen.getByText('Editar datos');
    fireEvent.click(editarButton);

    const nombreInput = screen.getByLabelText('Nombres');
    fireEvent.change(nombreInput, { target: { value: 'Jane' } });

    const cancelarButton = screen.getByText('Cancelar');
    fireEvent.click(cancelarButton);

    expect(screen.getByLabelText('Nombres')).toHaveValue('John');
    expect(screen.getByLabelText('Nombres')).toHaveAttribute('readOnly');
  });

  test('envía el formulario con los datos actualizados', () => {
    render(<DatosPersonales />);
    
    const editarButton = screen.getByText('Editar datos');
    fireEvent.click(editarButton);

    const nombreInput = screen.getByLabelText('Nombres');
    fireEvent.change(nombreInput, { target: { value: 'Jane' } });

    const guardarButton = screen.getByText('Guardar Cambios');
    fireEvent.click(guardarButton);

    expect(screen.getByLabelText('Nombres')).toHaveValue('Jane');
    expect(screen.getByLabelText('Nombres')).toHaveAttribute('readOnly');
  });

  test('intercala la visibilidad de la contraseña', () => {
    render(<DatosPersonales />);
    
    const passwordInput = screen.getByLabelText('Contraseña');
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
